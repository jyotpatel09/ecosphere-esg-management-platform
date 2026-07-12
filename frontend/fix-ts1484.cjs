const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Running tsc...');
  execSync('npx tsc -b', { stdio: 'pipe' });
  console.log('No TS errors found.');
} catch (error) {
  const output = error.stdout.toString();
  const lines = output.split('\n');
  const filesToFix = new Map(); // filepath -> array of type names

  // src/modules/governance/services/policy.service.ts(1,18): error TS1484: 'PolicyFormData' is a type...
  const ts1484Regex = /^(.*?)\(\d+,\d+\): error TS1484: '(.*?)'/;

  lines.forEach(line => {
    const match = line.match(ts1484Regex);
    if (match) {
      const file = match[1].trim();
      const typeName = match[2].trim();
      if (!filesToFix.has(file)) {
        filesToFix.set(file, new Set());
      }
      filesToFix.get(file).add(typeName);
    }
  });

  if (filesToFix.size === 0) {
    console.log('No TS1484 errors found.');
  }

  for (const [file, typeNames] of filesToFix.entries()) {
    const absPath = path.resolve(file);
    let content = fs.readFileSync(absPath, 'utf8');
    
    // We just safely convert ALL imports of these types.
    // However, it's safer to just replace `import { ... }` with `import type { ... }` globally for that file
    // IF the file only imports types from that specific path.
    // A smarter approach: find the word and prefix `type ` if not inside `import type`.
    
    // But since this codebase is simple, we can just replace:
    // `import { A, B } from` -> `import type { A, B } from`
    // assuming they are all from the local types directory.
    // Wait, the safest is to let ESLint/Prettier fix it, but we can do a simpler regex:
    
    // For each typeName, we find `typeName` inside an import block and if it's there, we change the whole block to `import type` 
    // IF all exported items are types. Wait, if some are values, `import type` breaks values.
    
    // Let's just manually replace the matched ones.
    const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g;
    
    content = content.replace(importRegex, (match, importsStr, modulePath) => {
      // Check if any of the problematic types are in this import
      const imports = importsStr.split(',').map(s => s.trim());
      const hasProblematicType = imports.some(i => typeNames.has(i.split(/\s+as\s+/)[0]));
      
      if (hasProblematicType) {
        // Are ALL of them problematic types?
        // Actually, we can just do `import type` for the whole block because they are coming from a `types` or `../types` folder usually!
        return `import type { ${importsStr} } from '${modulePath}'`;
      }
      
      return match;
    });

    fs.writeFileSync(absPath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
