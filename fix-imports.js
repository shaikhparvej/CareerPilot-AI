const fs = require('fs');
const path = require('path');

function getRelativePath(currentFilePath, importPath) {
  // Get the directory of the current file relative to the project root
  const currentDir = path.dirname(currentFilePath);
  const levels = currentDir.split(path.sep).filter(p => p !== '').length;

  // Create the relative path
  const goUp = '../'.repeat(levels);

  if (importPath.startsWith('@/components/ui/')) {
    return goUp + 'components/ui/' + importPath.replace('@/components/ui/', '');
  } else if (importPath.startsWith('@/components/')) {
    return goUp + 'components/' + importPath.replace('@/components/', '');
  } else if (importPath.startsWith('@/app/components/')) {
    return goUp.slice(0, -3) + 'components/' + importPath.replace('@/app/components/', '');
  } else if (importPath.startsWith('@/app/data/')) {
    return goUp.slice(0, -3) + 'data/' + importPath.replace('@/app/data/', '');
  } else if (importPath.startsWith('@/config/')) {
    return goUp + 'config/' + importPath.replace('@/config/', '');
  } else if (importPath.startsWith('@/lib/')) {
    return goUp + 'lib/' + importPath.replace('@/lib/', '');
  } else if (importPath.startsWith('@/app/')) {
    return goUp.slice(0, -3) + importPath.replace('@/app/', '');
  }

  return importPath;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Process regular imports
  newContent = newContent.replace(/import\s+.*?from\s+["'](@\/[^"']+)["']/g, (match, importPath) => {
    const newPath = getRelativePath(filePath.replace(process.cwd() + path.sep, ''), importPath);
    return match.replace(importPath, newPath);
  });

  // Process dynamic imports
  newContent = newContent.replace(/import\s*\(\s*["'](@\/[^"']+)["']\s*\)/g, (match, importPath) => {
    const newPath = getRelativePath(filePath.replace(process.cwd() + path.sep, ''), importPath);
    return match.replace(importPath, newPath);
  });

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed: ${filePath}`);
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'CareerPilot AI') {
      processDirectory(fullPath);
    } else if (stat.isFile() && item.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

// Start processing from the app directory
const appDir = path.join(process.cwd(), 'app');
if (fs.existsSync(appDir)) {
  processDirectory(appDir);
  console.log('Import fixing complete!');
} else {
  console.log('App directory not found!');
}
