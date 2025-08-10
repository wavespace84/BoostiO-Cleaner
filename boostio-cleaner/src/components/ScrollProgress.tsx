import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-primary/20 origin-left z-[60]">
      <motion.div
        className="h-full bg-gradient-primary origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollProgress;