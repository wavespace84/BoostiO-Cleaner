import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: 'purple' | 'mint' | 'pink' | 'ivory';
  delay?: number;
}

const colorClasses = {
  purple: {
    gradient: 'from-purple/20 to-purple-light/20',
    border: 'border-purple/30',
    icon: 'text-purple',
    hover: 'hover:border-purple/50 hover:shadow-purple/25',
  },
  mint: {
    gradient: 'from-mint/20 to-mint-light/20',
    border: 'border-mint/30',
    icon: 'text-mint',
    hover: 'hover:border-mint/50 hover:shadow-mint/25',
  },
  pink: {
    gradient: 'from-pink/20 to-pink-light/20',
    border: 'border-pink/30',
    icon: 'text-pink',
    hover: 'hover:border-pink/50 hover:shadow-pink/25',
  },
  ivory: {
    gradient: 'from-ivory/20 to-ivory-light/20',
    border: 'border-ivory/30',
    icon: 'text-ivory',
    hover: 'hover:border-ivory/50 hover:shadow-ivory/25',
  },
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  color,
  delay = 0 
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative group overflow-hidden rounded-2xl",
        "bg-card/50 backdrop-blur-xl border",
        colors.border,
        colors.hover,
        "transition-all duration-300",
        "hover:shadow-lg"
      )}
    >
      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        colors.gradient
      )} />

      <div className="relative p-8">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-16 h-16 rounded-xl bg-background/50 flex items-center justify-center mb-6",
            "border border-white/10"
          )}
        >
          <Icon className={cn("w-8 h-8", colors.icon)} />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>

        {/* Features list */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className={cn("text-lg mt-0.5", colors.icon)}>•</span>
              <span className="text-gray-300 text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Action button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "mt-6 px-6 py-3 rounded-lg font-medium",
            "bg-white/5 border border-white/10",
            "hover:bg-white/10 transition-all duration-300",
            "text-white"
          )}
        >
          자세히 보기
        </motion.button>
      </div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      >
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;