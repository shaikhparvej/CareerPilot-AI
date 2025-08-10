const fs = require('fs');
const path = require('path');

const filesToFix = [
    './app/careerplanning/checkcareer/components/Assissment.js',
    './app/learn/course/components/BasicData.js',
    './app/learn/course/components/CourseExam.js',
    './app/learn/course/components/McqExam.js',
    './app/learn/course/components/PreviewCourse.js'
];

function fixFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Fix import paths based on actual file location
        if (filePath.includes('app/careerplanning/checkcareer/components/')) {
            // From app/careerplanning/checkcareer/components/ to config/
            content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, "from '../../../../config/AiModels'");
            content = content.replace(/import\s+[\s\S]*?from\s+['"]\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, (match) => {
                return match.replace("../../../config/AiModels", "../../../../config/AiModels");
            });
        } else if (filePath.includes('app/learn/course/components/')) {
            // From app/learn/course/components/ to config/
            content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, "from '../../../../config/AiModels'");
            content = content.replace(/import\s+[\s\S]*?from\s+['"]\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, (match) => {
                return match.replace("../../../config/AiModels", "../../../../config/AiModels");
            });
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed imports in: ${filePath}`);
        } else {
            console.log(`ℹ️  No changes needed in: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🔧 Fixing remaining import errors...\n');

filesToFix.forEach(fixFile);

console.log('\n✨ Import fix process completed!');
