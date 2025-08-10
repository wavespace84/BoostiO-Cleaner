const { contextBridge, ipcRenderer } = require('electron');

// React 앱에서 사용할 수 있는 API를 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // 시스템 정보 가져오기
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // 임시 파일 정리
  cleanTempFiles: () => ipcRenderer.invoke('clean-temp-files'),
  
  // 메모리 최적화
  optimizeMemory: () => ipcRenderer.invoke('optimize-memory'),
  
  // 시작 프로그램 목록
  getStartupPrograms: () => ipcRenderer.invoke('get-startup-programs'),
  
  // 플랫폼 정보
  platform: process.platform
});