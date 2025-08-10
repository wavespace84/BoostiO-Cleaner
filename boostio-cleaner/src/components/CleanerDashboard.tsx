import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Trash2, 
  Zap, 
  Activity,
  HardDrive,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';
import UserProfileCard from './UserProfileCard';

interface SystemInfo {
  platform: string;
  totalMemory: number;
  freeMemory: number;
  cpuUsage: any;
  uptime: number;
}

const CleanerDashboard: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [isCleaningTemp, setIsCleaningTemp] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [cleanResult, setCleanResult] = useState<string | null>(null);
  const [optimizeResult, setOptimizeResult] = useState<string | null>(null);

  const isElectron = window.electronAPI !== undefined;

  useEffect(() => {
    if (isElectron) {
      loadSystemInfo();
    }
  }, [isElectron]);

  const loadSystemInfo = async () => {
    if (!isElectron) return;
    
    try {
      const info = await window.electronAPI.getSystemInfo();
      setSystemInfo(info);
    } catch (error) {
      console.error('Failed to load system info:', error);
    }
  };

  const handleCleanTemp = async () => {
    if (!isElectron) {
      setCleanResult('데모 모드: 임시 파일 350MB가 정리되었습니다.');
      return;
    }

    setIsCleaningTemp(true);
    setCleanResult(null);
    
    try {
      const result = await window.electronAPI.cleanTempFiles();
      setCleanResult(`${result.cleanedCount}개 파일 (${result.cleanedSize}) 정리 완료!`);
    } catch (error) {
      setCleanResult('정리 중 오류가 발생했습니다.');
    } finally {
      setIsCleaningTemp(false);
    }
  };

  const handleOptimizeMemory = async () => {
    if (!isElectron) {
      setOptimizeResult('데모 모드: 메모리 125MB가 최적화되었습니다.');
      return;
    }

    setIsOptimizing(true);
    setOptimizeResult(null);
    
    try {
      const result = await window.electronAPI.optimizeMemory();
      setOptimizeResult(`메모리 ${result.freed}MB 확보 완료!`);
      loadSystemInfo(); // 시스템 정보 새로고침
    } catch (error) {
      setOptimizeResult('최적화 중 오류가 발생했습니다.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const getMemoryUsagePercent = () => {
    if (!systemInfo) return 0;
    return ((systemInfo.totalMemory - systemInfo.freeMemory) / systemInfo.totalMemory * 100).toFixed(1);
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
            <span className="text-gradient">실시간</span> 시스템 상태
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {isElectron ? '현재 시스템 상태를 확인하고 최적화하세요' : '데모 모드로 실행 중입니다'}
          </p>
        </motion.div>

        {/* User Profile and System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <UserProfileCard />
          </motion.div>

          {/* System Status Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-8 h-8 text-purple" />
              <span className="text-sm text-gray-400">CPU</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {systemInfo ? `${Math.random() * 30 + 20}%` : '--'}
            </div>
            <p className="text-sm text-gray-400 mt-1">사용률</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <HardDrive className="w-8 h-8 text-mint" />
              <span className="text-sm text-gray-400">메모리</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {systemInfo ? `${getMemoryUsagePercent()}%` : '--'}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {systemInfo ? `${(systemInfo.freeMemory / 1024 / 1024 / 1024).toFixed(1)}GB 남음` : '계산 중...'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-pink" />
              <span className="text-sm text-gray-400">가동 시간</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {systemInfo ? `${Math.floor(systemInfo.uptime / 3600)}시간` : '--'}
            </div>
            <p className="text-sm text-gray-400 mt-1">연속 사용</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Trash2 className="w-8 h-8 text-ivory" />
              <span className="text-sm text-gray-400">정크 파일</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {isElectron ? '검사 필요' : '350MB'}
            </div>
            <p className="text-sm text-gray-400 mt-1">예상 크기</p>
          </motion.div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trash2 className="w-6 h-6 text-mint" />
              임시 파일 정리
            </h3>
            <p className="text-gray-400 mb-6">
              시스템의 불필요한 임시 파일을 안전하게 제거합니다.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCleanTemp}
              disabled={isCleaningTemp}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all duration-300",
                "bg-gradient-primary text-white shadow-lg shadow-primary/25",
                "hover:shadow-primary/40",
                isCleaningTemp && "opacity-50 cursor-not-allowed"
              )}
            >
              {isCleaningTemp ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                  정리 중...
                </span>
              ) : (
                '정리 시작'
              )}
            </motion.button>

            {cleanResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-4 p-3 rounded-lg flex items-center gap-2",
                  "bg-green-500/10 text-green-400 border border-green-500/20"
                )}
              >
                <CheckCircle className="w-5 h-5" />
                {cleanResult}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple" />
              메모리 최적화
            </h3>
            <p className="text-gray-400 mb-6">
              사용하지 않는 메모리를 해제하여 시스템 성능을 향상시킵니다.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOptimizeMemory}
              disabled={isOptimizing}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all duration-300",
                "bg-gradient-secondary text-white shadow-lg shadow-secondary/25",
                "hover:shadow-secondary/40",
                isOptimizing && "opacity-50 cursor-not-allowed"
              )}
            >
              {isOptimizing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                  최적화 중...
                </span>
              ) : (
                '최적화 시작'
              )}
            </motion.button>

            {optimizeResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-4 p-3 rounded-lg flex items-center gap-2",
                  "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                )}
              >
                <CheckCircle className="w-5 h-5" />
                {optimizeResult}
              </motion.div>
            )}
          </motion.div>
        </div>

        {!isElectron && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="glass-effect rounded-xl p-6 max-w-2xl mx-auto flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <p className="text-gray-300">
                현재 웹 브라우저에서 데모 모드로 실행 중입니다. 
                전체 기능을 사용하려면 데스크톱 앱을 다운로드하세요.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CleanerDashboard;