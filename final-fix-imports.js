const fs = require('fs');
const path = require('path');

// Fix the specific cases mentioned in the error
const specificFixes = {
  'app/preparation/components/CodeExam.js': {
    '../../../../config/AllAiModels': '../../../config/AiModels'
  },
  'app/preparation/components/CodingRound.js': {
    '../../../../config/AllAiModels': '../../../config/AiModels'
  },
  'app/preparation/components/StartHumanInterview.js': {
    '../../../../config/AiTeacherStudent': '../../../config/AiTeacherStudent'
  },
  'app/preparation/mockinterview/[mockId]/page.js': {
    '../../../../../config/AllAiModels': '../../../../config/AiModels'
  },
  'app/preparation/mockinterview/components/DetailForm.js': {
    '../../../../../config/AllAiModels': '../../../../config/AiModels'
  }
};

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Apply global fixes
  newContent = newContent.replace(/AllAiModels/g, 'AiModels');
  newContent = newContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels/g, '../../../../config/AiModels');
  newContent = newContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels/g, '../../../../config/AiModels');
  newContent = newContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels/g, '../../../config/AiModels');

  // Apply specific fixes
  const relativePath = filePath.replace(process.cwd() + path.sep, '').replace(/\\/g, '/');
  if (specificFixes[relativePath]) {
    for (const [oldPath, newPath] of Object.entries(specificFixes[relativePath])) {
      newContent = newContent.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
    }
  }

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed: ${relativePath}`);
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
  console.log('Final import fixing complete!');
} else {
  console.log('App directory not found!');
}
