const fs = require('fs');
const path = require('path');

const backendModules = ['environment', 'social', 'governance', 'gamification', 'reports', 'settings'];
const backendFiles = ['controller.ts', 'routes.ts', 'service.ts', 'repository.ts', 'validator.ts', 'types.ts', 'README.md'];

backendModules.forEach(mod => {
  const dir = path.join(__dirname, 'backend', 'src', 'modules', mod);
  fs.mkdirSync(dir, { recursive: true });
  backendFiles.forEach(file => {
    let content = `// Placeholder for ${mod} ${file.split('.')[0]}\n`;
    if (file === 'README.md') {
      content = `# ${mod.charAt(0).toUpperCase() + mod.slice(1)} Module\n\n## Purpose\nHandles business logic for the ${mod} domain.\n\n## Responsibilities\n- Add future responsibilities here.\n\n## Future Database Models\n- TBD\n\n## Future API Routes\n- \`/api/${mod}/*\`\n\n## Folder Ownership\n- Relevant feature team\n`;
    }
    fs.writeFileSync(path.join(dir, file), content);
  });
});

const frontendModules = ['environment', 'social', 'governance', 'gamification', 'reports', 'settings'];
const frontendDirs = ['components', 'pages', 'hooks', 'services', 'api', 'types', 'constants', 'utils'];

frontendModules.forEach(mod => {
  const modDir = path.join(__dirname, 'frontend', 'src', 'modules', mod);
  frontendDirs.forEach(dir => {
    fs.mkdirSync(path.join(modDir, dir), { recursive: true });
    fs.writeFileSync(path.join(modDir, dir, '.gitkeep'), '');
  });
  const readmeContent = `# ${mod.charAt(0).toUpperCase() + mod.slice(1)} Module (Frontend)\n\n## Purpose\nUI and client-side logic for the ${mod} domain.\n\n## Folder Ownership\n- Relevant feature team\n`;
  fs.writeFileSync(path.join(modDir, 'README.md'), readmeContent);
});

// Frontend API Placeholders
const apiFiles = ['auth.ts', 'dashboard.ts', 'environment.ts', 'social.ts', 'governance.ts', 'reports.ts', 'settings.ts'];
const apiDir = path.join(__dirname, 'frontend', 'src', 'services', 'api');
fs.mkdirSync(apiDir, { recursive: true });
apiFiles.forEach(file => {
  const content = `// Placeholder API wrapper for ${file.split('.')[0]}\nimport axios from 'axios';\n\n// export const getData = () => axios.get('/api/${file.split('.')[0]}');\n`;
  fs.writeFileSync(path.join(apiDir, file), content);
});

// Shared Types placeholders
const backendTypesDir = path.join(__dirname, 'backend', 'src', 'types');
fs.mkdirSync(backendTypesDir, { recursive: true });
fs.writeFileSync(path.join(backendTypesDir, 'index.ts'), `// Global Backend Types\nexport interface User { id: string; }\nexport interface Role { id: string; }\nexport interface Department { id: string; }\nexport interface ApiResponse<T = any> { success: boolean; message: string; data?: T; error?: any; }\n`);

const frontendTypesDir = path.join(__dirname, 'frontend', 'src', 'types');
fs.mkdirSync(frontendTypesDir, { recursive: true });
fs.writeFileSync(path.join(frontendTypesDir, 'index.ts'), `// Global Frontend Types\nexport interface User { id: string; }\nexport interface Role { id: string; }\nexport interface Department { id: string; }\nexport interface ApiResponse<T = any> { success: boolean; message: string; data?: T; error?: any; }\nexport interface Pagination { page: number; limit: number; total: number; }\nexport interface Notification { id: string; }\nexport interface Dashboard { metrics: any; }\n`);

console.log('Scaffolding complete.');
