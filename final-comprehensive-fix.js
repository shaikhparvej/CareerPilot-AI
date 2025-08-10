const fs = require('fs');
const path = require('path');

console.log('🔧 Final comprehensive fix for all remaining issues...\n');

// Step 1: Fix any remaining @/ imports
function fixAtSymbolImports() {
    console.log('1. Fixing @/ imports...');

    const problematicFiles = [
        './app/preparation/mockinterview/components/InterviewFeedbackUI.js',
        './app/preparation/softskill/assessment/components/FeedbackReport.js'
    ];

    problematicFiles.forEach(filePath => {
        if (!fs.existsSync(filePath)) return;

        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Calculate the relative path to components
        const pathParts = filePath.split('/').slice(0, -1); // Remove filename
        let relativePath = '';
        for (let i = 1; i < pathParts.length; i++) { // Start from 1 to skip '.'
            relativePath += '../';
        }

        // Replace @/ imports with relative paths
        content = content.replace(/@\/components/g, `${relativePath}components`);
        content = content.replace(/@\/lib/g, `${relativePath}lib`);
        content = content.replace(/@\/config/g, `${relativePath}config`);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`   ✅ Fixed @/ imports in: ${filePath}`);
        }
    });
}

// Step 2: Fix specific path depth issues
function fixSpecificPaths() {
    console.log('2. Fixing specific path issues...');

    const specificFixes = {
        './app/preparation/softskill/assessment/page.js': {
            old: '../../../config/AiModels',
            new: '../../../../config/AiModels'
        },
        './app/preparation/softskill/page.js': {
            old: '../../config/AiModels',
            new: '../../../config/AiModels'
        }
    };

    Object.entries(specificFixes).forEach(([filePath, fix]) => {
        if (!fs.existsSync(filePath)) return;

        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        content = content.replace(new RegExp(`from\\s+['"]${fix.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'), `from '${fix.new}'`);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`   ✅ Fixed: ${filePath} (${fix.old} → ${fix.new})`);
        }
    });
}

// Step 3: Fix any remaining AiTeacherStudent imports
function fixAiTeacherStudentImports() {
    console.log('3. Fixing AiTeacherStudent imports...');

    const files = [
        './app/learn/components/StartHumanInterview.js'
    ];

    files.forEach(filePath => {
        if (!fs.existsSync(filePath)) return;

        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // From app/learn/components/ to config/ should be ../../../../config/
        content = content.replace(/from\s+['"].*config\/AiTeacherStudent['"]/g, `from '../../../../config/AiTeacherStudent.js'`);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`   ✅ Fixed AiTeacherStudent import in: ${filePath}`);
        }
    });
}

// Run all fixes
fixAtSymbolImports();
fixSpecificPaths();
fixAiTeacherStudentImports();

console.log('\n✨ Final comprehensive fix completed!');
