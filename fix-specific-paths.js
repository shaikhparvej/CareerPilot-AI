const fs = require('fs');
const path = require('path');

const fixMappings = {
    // Fix specific incorrect paths
    './app/careerplanning/checkcareer/page.js': {
        old: '../../config/AiModels',
        new: '../../../config/AiModels'  // From app/careerplanning/checkcareer/ to config/
    },
    './app/learn/course/start/page.js': {
        old: '../../../config/AiModels',
        new: '../../../../config/AiModels'  // From app/learn/course/start/ to config/
    },
    './app/preparation/codinground/page.js': {
        old: '../../config/AiModels',
        new: '../../../config/AiModels'  // From app/preparation/codinground/ to config/
    },
    './app/preparation/mockinterview/[mockId]/page.js': {
        old: '../../../config/AiModels',
        new: '../../../../config/AiModels'  // From app/preparation/mockinterview/[mockId]/ to config/
    },
    './app/preparation/components/StartHumanInterview.js': {
        old: '../../../config/AiTeacherStudent',
        new: '../../../config/AiTeacherStudent'  // This file should import from the correct AiTeacherStudent file
    }
};

console.log('🔧 Fixing specific path import errors...\n');

Object.entries(fixMappings).forEach(([filePath, fix]) => {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Replace the incorrect import
        content = content.replace(new RegExp(`from\\s+['"]${fix.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'), `from '${fix.new}'`);
        content = content.replace(new RegExp(`import\\s+[^}]*}\\s*from\\s+['"]${fix.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'), (match) => {
            return match.replace(fix.old, fix.new);
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed import path in: ${filePath}`);
            console.log(`   Changed: ${fix.old} → ${fix.new}`);
        } else {
            console.log(`ℹ️  No changes needed in: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
});

console.log('\n✨ Specific path fixes completed!');
