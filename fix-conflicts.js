const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('frontend/src');
let fixedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<<<<<<< HEAD')) {
    const regexFlexible = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [a-f0-9]+(\r?\n)?/g;
    const newContent = content.replace(regexFlexible, '$1');
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      fixedCount++;
      console.log('Fixed', file);
    }
  }
});
console.log('Fixed conflicts in', fixedCount, 'files.');
