
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('Setting up Prayer Times Desktop Application...');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Setup Electron scripts
  console.log('Setting up Electron build scripts...');
  // Import the setup function from setup-electron-scripts.js
  import('./scripts/setup-electron-scripts.js')
    .then(() => {
      console.log('\n=== Installation Complete ===');
      console.log('\nYou can now run the following commands:');
      console.log('  npm run dev         - Start development server');
      console.log('  npm run electron:dev - Run Electron app in development mode');
      console.log('  npm run electron:build - Build installable Electron app');
      console.log('\nThe built app will be available in the "release" folder.');
    })
    .catch(error => {
      console.error('Error during script setup:', error);
      process.exit(1);
    });
} catch (error) {
  console.error('Error during installation:', error);
  process.exit(1);
}
