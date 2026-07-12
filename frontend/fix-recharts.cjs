const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  const output = execSync('npx tsc -b', { encoding: 'utf8', stdio: 'pipe' });
} catch (error) {
  const output = error.stdout.toString();
  const ts2322Regex = /^(.*?)\(\d+,\d+\): error TS2322: Type '\(value: number.*?=>.*?is not assignable to type 'Formatter<ValueType, NameType>/;
  
  const filesToFix = new Set();
  output.split('\n').forEach(line => {
    const match = line.match(ts2322Regex);
    if (match) {
      filesToFix.add(match[1].trim());
    }
  });

  for (const file of filesToFix) {
    const absPath = path.resolve(file);
    let content = fs.readFileSync(absPath, 'utf8');
    content = content.replace(/\(value:\s*number\)/g, '(value: any)');
    content = content.replace(/\(value:\s*number,\s*name:\s*string\)/g, '(value: any, name: any)');
    fs.writeFileSync(absPath, content, 'utf8');
    console.log(`Fixed recharts formatter in ${file}`);
  }
}
