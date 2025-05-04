
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Read the current package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add our electron scripts
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['electron:dev'] = 'node --experimental-modules electron/package-scripts.mjs electronDev';
  packageJson.scripts['electron:build'] = 'node --experimental-modules electron/package-scripts.mjs electronBuild';
  
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('Electron scripts have been added to package.json');
} catch (error) {
  console.error('Error setting up Electron scripts:', error);
  process.exit(1);
}
