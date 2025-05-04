
// This file contains the scripts needed to build the Electron app
// It will be loaded by the main package.json

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to execute commands
function runCommand(command) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing ${command}:`, error);
    return false;
  }
}

// Main electron:dev script
function electronDev() {
  console.log('Starting Electron in development mode...');
  runCommand('cross-env NODE_ENV=development electron electron/main.js');
}

// Main electron:build script
function electronBuild() {
  console.log('Building Electron application...');
  
  // First build the React app
  if (!runCommand('npm run build')) {
    console.error('Failed to build React app');
    process.exit(1);
  }
  
  // Then package with electron-builder
  if (!runCommand('electron-builder build --config electron-builder.json')) {
    console.error('Failed to package Electron app');
    process.exit(1);
  }
  
  console.log('Build completed successfully! Check the release folder for the packaged app.');
}

// Export the functions
module.exports = {
  electronDev,
  electronBuild
};
