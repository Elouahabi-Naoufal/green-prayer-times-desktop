
const fs = require('fs');
const path = require('path');

try {
  // Read the current package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add our electron scripts
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['electron:dev'] = 'node -e "require(\'./electron/package-scripts\').electronDev()"';
  packageJson.scripts['electron:build'] = 'node -e "require(\'./electron/package-scripts\').electronBuild()"';
  
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('Electron scripts have been added to package.json');
} catch (error) {
  console.error('Error setting up Electron scripts:', error);
  process.exit(1);
}
