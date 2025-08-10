import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Trash2, 
  Zap, 
  HardDrive, 
  Lock,
  Gauge,
  RefreshCw
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'PC 최적화',
      description: 'AI 기반 시스템 분석으로 PC 성능을 극대화합니다',
      features: [
        '실시간 성능 모니터링',
        '자동 프로세스 최적화',
        '메모리 관리 및 정리',
        'CPU 사용률 최적화'
      ],
      color: 'purple' as const,
    },
    {
      icon: Trash2,
      title: '정크 파일 제거',
      description: '불필요한 파일을 찾아 안전하게 제거합니다',
      features: [
        '임시 파일 자동 감지',
        '브라우저 캐시 정리',
        '중복 파일 찾기',
        '대용량 파일 분석'
      ],
      color: 'mint' as const,
    },
    {
      icon: Shield,
      title: '보안 강화',
      description: '실시간 보안 위협을 감지하고 차단합니다',
      features: [
        '악성코드 실시간 검사',
        '개인정보 보호',
        '네트워크 보안 강화',
        '취약점 자동 패치'
      ],
      color: 'pink' as const,
    },
    {
      icon: Zap,
      title: '부팅 속도 향상',
      description: '시작 프로그램을 최적화하여 부팅 시간을 단축합니다',
      features: [
        '시작 프로그램 관리',
        '서비스 최적화',
        '부팅 시간 분석',
        '자동 시작 제어'
      ],
      color: 'ivory' as const,
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">강력한 기능</span>으로
            <br />
            PC를 새것처럼
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AI 기술을 활용한 스마트한 최적화로 
            여러분의 PC를 최상의 상태로 유지합니다
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Additional features showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8">추가 기능</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: HardDrive, label: '디스크 조각 모음' },
                { icon: Lock, label: '파일 암호화' },
                { icon: Gauge, label: '성능 벤치마크' },
                { icon: RefreshCw, label: '자동 업데이트' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;