import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ChevronDown, User } from 'lucide-react';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '기능', href: '#features' },
    { 
      label: '솔루션', 
      href: '#solutions',
      dropdown: ['PC 최적화', '보안 강화', '성능 향상', '정크 파일 제거']
    },
    { label: '가격', href: '#pricing' },
    { label: '지원', href: '#support' },
  ];

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={springTransition}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-effect-strong shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <a href="/" className="text-2xl font-bold text-gradient">
              BoostiO Cleaner
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.a
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className={cn(
                    "text-gray-300 hover:text-white transition-colors duration-300",
                    "flex items-center gap-1"
                  )}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </motion.a>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "absolute top-full left-0 mt-2 w-48",
                        "glass-effect-strong rounded-lg shadow-xl",
                        "border border-glass-border",
                        "overflow-hidden"
                      )}
                    >
                      {item.dropdown.map((subItem, index) => (
                        <motion.a
                          key={subItem}
                          href="#"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "block px-4 py-3 text-sm text-gray-300",
                            "hover:text-white hover:bg-white/10",
                            "transition-all duration-300"
                          )}
                        >
                          {subItem}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-6 py-2 rounded-lg",
                "bg-gradient-primary text-white font-medium",
                "shadow-lg shadow-primary/25",
                "hover:shadow-primary/40 transition-all duration-300",
                "flex items-center gap-2"
              )}
            >
              <Download className="w-4 h-4" />
              다운로드
            </motion.button>

            {/* User Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="ml-4"
            >
              <button className={cn(
                "w-10 h-10 rounded-full",
                "bg-white/5 border border-white/10",
                "flex items-center justify-center",
                "hover:bg-white/10 transition-all duration-300",
                "relative overflow-hidden"
              )}>
                <User className="w-5 h-5 text-gray-400" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-50" />
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect-strong border-t border-glass-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "block px-4 py-3 rounded-lg",
                    "text-gray-300 hover:text-white",
                    "hover:bg-white/10 transition-all duration-300"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-full px-6 py-3 rounded-lg",
                  "bg-gradient-primary text-white font-medium",
                  "shadow-lg shadow-primary/25",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Download className="w-4 h-4" />
                다운로드
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;