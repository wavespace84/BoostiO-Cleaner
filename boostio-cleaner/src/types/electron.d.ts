export interface ElectronAPI {
  getSystemInfo: () => Promise<{
    platform: string;
    totalMemory: number;
    freeMemory: number;
    cpuUsage: any;
    uptime: number;
  }>;
  cleanTempFiles: () => Promise<{
    cleanedSize: string;
    cleanedCount: number;
  }>;
  optimizeMemory: () => Promise<{
    before: number;
    after: number;
    freed: number;
  }>;
  getStartupPrograms: () => Promise<Array<{
    name: string;
    command: string;
  }>>;
  platform: string;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}