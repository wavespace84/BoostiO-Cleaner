import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Gauge } from 'lucide-react';

const typingTexts = [
  'PC 성능을 최대 300% 향상시키세요',
  '불필요한 파일을 한 번에 정리하세요',
  '시스템을 최적화하고 보호하세요',
  '더 빠르고 안전한 컴퓨터 환경을 만들어요'
];

const HeroSection: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const text = typingTexts[currentTextIndex];
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setTypingText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentTextIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const statsData = [
    { icon: Gauge, label: '성능 향상', value: '300%', color: 'text-purple' },
    { icon: Shield, label: '보안 강화', value: '99.9%', color: 'text-mint' },
    { icon: Zap, label: '속도 개선', value: '5배', color: 'text-pink' },
    { icon: Sparkles, label: '공간 확보', value: '50GB+', color: 'text-ivory' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">AI가 관리하는</span>
            <span className="text-gradient bg-gradient-primary bg-200% animate-gradient-shift">
              차세대 PC 최적화 솔루션
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-xl sm:text-2xl text-gray-300 h-8">
            {typingText}
            <span className="inline-block w-0.5 h-6 ml-1 bg-primary animate-blink" />
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
          >
            무료 체험 시작하기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass-effect text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            기능 둘러보기
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-xl p-6 hover:shadow-glow transition-all duration-300"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;