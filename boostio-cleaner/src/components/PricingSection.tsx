import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  color: 'purple' | 'mint' | 'pink';
}

const PricingSection: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: 'Basic',
      price: '무료',
      period: '',
      description: '기본적인 PC 최적화 기능',
      features: [
        '기본 시스템 스캔',
        '임시 파일 정리',
        '브라우저 캐시 정리',
        '시작 프로그램 관리',
      ],
      color: 'purple',
    },
    {
      name: 'Pro',
      price: '₩9,900',
      period: '/월',
      description: '전문가를 위한 고급 기능',
      features: [
        'Basic의 모든 기능',
        '실시간 성능 모니터링',
        '자동 최적화 스케줄링',
        '고급 보안 스캔',
        '24/7 기술 지원',
        '광고 제거',
      ],
      isPopular: true,
      color: 'mint',
    },
    {
      name: 'Enterprise',
      price: '맞춤 견적',
      period: '',
      description: '기업을 위한 완벽한 솔루션',
      features: [
        'Pro의 모든 기능',
        '다중 디바이스 관리',
        '중앙 집중식 대시보드',
        '커스텀 정책 설정',
        '전담 지원 매니저',
        'API 액세스',
      ],
      color: 'pink',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        damping: 15,
      },
    },
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            합리적인 <span className="text-gradient">가격 정책</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            필요에 맞는 플랜을 선택하고 
            PC 성능을 극대화하세요
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={cn(
                "relative rounded-2xl p-8",
                "bg-card/50 backdrop-blur-xl",
                "border transition-all duration-300",
                plan.isPopular
                  ? "border-primary shadow-lg shadow-primary/25"
                  : "border-border hover:border-border-light",
                "hover:shadow-xl"
              )}
            >
              {plan.isPopular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2"
                >
                  <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    가장 인기
                  </div>
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className={cn(
                      "w-5 h-5 mt-0.5",
                      plan.color === 'purple' && "text-purple",
                      plan.color === 'mint' && "text-mint",
                      plan.color === 'pink' && "text-pink"
                    )} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full py-3 rounded-lg font-medium transition-all duration-300",
                  plan.isPopular
                    ? "bg-gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                )}
              >
                {plan.name === 'Enterprise' ? '문의하기' : '시작하기'}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;