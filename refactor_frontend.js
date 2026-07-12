const fs = require('fs');
const path = require('path');

function replaceInDir(dir, searchRegex, replacement) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath, searchRegex, replacement);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;
      // Very naive relative path replacement for specific imports
      // E.g., from '../components/Button' to '../shared/components/Button'
      // This regex handles various relative depths
      content = content.replace(/from\s+['"]((?:\.\.\/)+|\.\/)components\/(.*)['"]/g, (match, prefix, comp) => {
        return `from '${prefix}shared/components/${comp}'`;
      });
      content = content.replace(/from\s+['"]((?:\.\.\/)+|\.\/)layouts\/(.*)['"]/g, (match, prefix, layout) => {
        return `from '${prefix}shared/layouts/${layout}'`;
      });
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

// 1. Move folders
const srcDir = path.join(__dirname, 'frontend', 'src');
const sharedDir = path.join(srcDir, 'shared');

if (!fs.existsSync(sharedDir)) fs.mkdirSync(sharedDir);

const componentsDir = path.join(srcDir, 'components');
const layoutsDir = path.join(srcDir, 'layouts');

if (fs.existsSync(componentsDir)) fs.renameSync(componentsDir, path.join(sharedDir, 'components'));
if (fs.existsSync(layoutsDir)) fs.renameSync(layoutsDir, path.join(sharedDir, 'layouts'));

// 2. Rewrite imports in entire src (excluding shared? no, include shared as they might import each other)
replaceInDir(srcDir, null, null);

// Also need to create other shared dirs
['hooks', 'utils', 'constants', 'icons', 'theme'].forEach(d => {
  fs.mkdirSync(path.join(sharedDir, d), { recursive: true });
});

console.log('Frontend refactor complete.');
