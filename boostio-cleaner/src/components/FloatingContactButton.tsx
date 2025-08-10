import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '../lib/utils';

const FloatingContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Message sent:', message);
    setMessage('');
    setIsOpen(false);
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, ...springTransition }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed bottom-8 right-8 z-50",
          "w-16 h-16 rounded-full",
          "bg-gradient-primary shadow-lg shadow-primary/25",
          "flex items-center justify-center",
          "hover:shadow-primary/40 transition-shadow duration-300"
        )}
      >
        <motion.div
          animate={{ rotate: isHovered ? 15 : 0 }}
          transition={springTransition}
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.div>

        {/* Ripple effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full bg-primary"
        />
      </motion.button>

      {/* Contact Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={springTransition}
              className={cn(
                "fixed bottom-24 right-8 z-50",
                "w-96 max-w-[calc(100vw-4rem)]",
                "glass-effect-strong rounded-2xl shadow-2xl",
                "border border-glass-border"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold text-white">문의하기</h3>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      이메일
                    </label>
                    <input
                      type="email"
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-gray-500",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        "transition-all duration-300"
                      )}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      문의 내용
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg resize-none",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-gray-500",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        "transition-all duration-300"
                      )}
                      placeholder="무엇을 도와드릴까요?"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full mt-6 px-6 py-3 rounded-lg",
                    "bg-gradient-primary text-white font-medium",
                    "shadow-lg shadow-primary/25",
                    "hover:shadow-primary/40 transition-all duration-300",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <span>메시지 보내기</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Quick responses */}
              <div className="px-6 pb-6">
                <p className="text-xs text-gray-400 mb-3">빠른 문의</p>
                <div className="flex gap-2 flex-wrap">
                  {['가격 문의', '기능 문의', '기술 지원'].map((quick) => (
                    <motion.button
                      key={quick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMessage(quick)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs",
                        "bg-white/5 border border-white/10",
                        "text-gray-300 hover:text-white",
                        "hover:bg-white/10 transition-all duration-300"
                      )}
                    >
                      {quick}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingContactButton;