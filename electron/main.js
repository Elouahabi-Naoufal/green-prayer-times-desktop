
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#ffffff',
      symbolColor: '#2f6d37'
    },
    frame: false,
    icon: path.join(__dirname, '../public/mosque-icon.png')
  });

  // In production, load the bundled index.html
  // In development, connect to dev server
  const startUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle fetching prayer times
ipcMain.handle('fetch-prayer-times', async () => {
  try {
    const url = 'https://www.yabiladi.com/prieres/details/101/tanger.html';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const prayerTable = $('table');
    const headers = [];
    prayerTable.find('th').each((i, el) => {
      headers.push($(el).text().trim());
    });
    
    const rows = prayerTable.find('tr').slice(1); // Skip header row
    
    const today = new Date();
    const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    let todaysPrayers = null;
    
    rows.each((i, row) => {
      const columns = $(row).find('td');
      const date = $(columns[0]).text().trim();
      
      if (date === todayFormatted) {
        todaysPrayers = [];
        columns.each((j, col) => {
          todaysPrayers.push($(col).text().trim());
        });
        return false; // Break the loop
      }
    });
    
    if (todaysPrayers) {
      const prayerTimes = {};
      headers.forEach((header, index) => {
        if (index > 0) { // Skip date column
          prayerTimes[header] = todaysPrayers[index];
        }
      });
      
      return {
        success: true,
        date: todaysPrayers[0],
        prayerTimes
      };
    } else {
      return {
        success: false,
        error: "No prayer times found for today."
      };
    }
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Window control handlers
ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) mainWindow.close();
});
