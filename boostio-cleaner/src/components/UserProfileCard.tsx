import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Settings, LogOut, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

interface UserProfileCardProps {
  username?: string;
  email?: string;
  plan?: 'Basic' | 'Pro' | 'Enterprise';
  className?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ 
  username, 
  email,
  plan = 'Basic',
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const planColors = {
    Basic: 'text-gray-400 bg-gray-400/10',
    Pro: 'text-purple bg-purple/10',
    Enterprise: 'text-gradient bg-gradient-primary/10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("max-w-sm mx-auto", className)}
    >
      <div className="glass-effect rounded-2xl p-6 shadow-xl">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Default User Icon */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={cn(
              "w-16 h-16 rounded-full",
              "bg-white/5 border-2 border-white/10",
              "flex items-center justify-center",
              "relative overflow-hidden group"
            )}
          >
            <User className="w-8 h-8 text-gray-400 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* User Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {username || '게스트 사용자'}
            </h3>
            <p className="text-sm text-gray-400">
              {email || '로그인하여 전체 기능을 사용하세요'}
            </p>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="mb-6">
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
            planColors[plan]
          )}>
            <Crown className="w-4 h-4" />
            {plan} 플랜
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
              "text-gray-300 hover:text-white",
              "hover:bg-white/5 transition-all duration-300",
              "text-left"
            )}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">설정</span>
          </motion.button>

          {username ? (
            <motion.button
              whileHover={{ x: 5 }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
                "text-gray-300 hover:text-white",
                "hover:bg-white/5 transition-all duration-300",
                "text-left"
              )}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">로그아웃</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full py-3 rounded-lg",
                "bg-gradient-primary text-white font-medium",
                "shadow-lg shadow-primary/25",
                "hover:shadow-primary/40 transition-all duration-300"
              )}
            >
              로그인
            </motion.button>
          )}
        </div>

        {/* Stats (when logged in) */}
        {username && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-white/10"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-gray-400">정리된 GB</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-xs text-gray-400">최적화 횟수</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfileCard;