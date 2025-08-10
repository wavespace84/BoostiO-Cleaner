const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/favicon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0A0B0F',
      symbolColor: '#FFFFFF',
      height: 30
    }
  });

  // 개발자 도구는 개발 모드에서만 열기
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // 개발 중에는 localhost를 로드
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // 프로덕션 빌드에서는 build 폴더의 index.html을 로드
    const indexPath = path.join(__dirname, '../build/index.html');
    mainWindow.loadFile(indexPath);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// PC 클리너 기능들
ipcMain.handle('get-system-info', async () => {
  return {
    platform: os.platform(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuUsage: process.cpuUsage(),
    uptime: os.uptime()
  };
});

// 임시 파일 정리
ipcMain.handle('clean-temp-files', async () => {
  const tempDir = os.tmpdir();
  let cleanedSize = 0;
  let cleanedCount = 0;

  try {
    const files = await fs.readdir(tempDir);
    
    for (const file of files) {
      try {
        const filePath = path.join(tempDir, file);
        const stats = await fs.stat(filePath);
        
        // 7일 이상 된 파일만 삭제
        const daysSinceModified = (Date.now() - stats.mtime) / (1000 * 60 * 60 * 24);
        
        if (daysSinceModified > 7) {
          await fs.unlink(filePath);
          cleanedSize += stats.size;
          cleanedCount++;
        }
      } catch (err) {
        // 개별 파일 삭제 실패는 무시
      }
    }
  } catch (err) {
    console.error('Temp cleanup error:', err);
  }

  return {
    cleanedSize: (cleanedSize / (1024 * 1024)).toFixed(2) + ' MB',
    cleanedCount
  };
});

// 메모리 최적화
ipcMain.handle('optimize-memory', async () => {
  global.gc && global.gc();
  
  const before = process.memoryUsage();
  
  // 가비지 컬렉션 강제 실행
  if (global.gc) {
    global.gc();
  }
  
  const after = process.memoryUsage();
  
  return {
    before: Math.round(before.heapUsed / 1024 / 1024),
    after: Math.round(after.heapUsed / 1024 / 1024),
    freed: Math.round((before.heapUsed - after.heapUsed) / 1024 / 1024)
  };
});

// 시작 프로그램 목록 가져오기
ipcMain.handle('get-startup-programs', async () => {
  // Windows의 경우 레지스트리에서 읽어옴
  if (process.platform === 'win32') {
    try {
      const { exec } = require('child_process');
      return new Promise((resolve) => {
        exec('wmic startup get caption,command', (error, stdout) => {
          if (error) {
            resolve([]);
            return;
          }
          
          const lines = stdout.split('\n').slice(1);
          const programs = lines
            .filter(line => line.trim())
            .map(line => {
              const parts = line.trim().split(/\s{2,}/);
              return {
                name: parts[0] || 'Unknown',
                command: parts[1] || ''
              };
            });
          
          resolve(programs);
        });
      });
    } catch (err) {
      return [];
    }
  }
  
  return [];
});