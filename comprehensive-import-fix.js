const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Finding all files with incorrect AiModels imports...\n');

// Find all JS files with wrong import paths
const findCommand = `for /f "tokens=*" %i in ('findstr /s /m "from.*config.*AiModels" app\\*.js') do @echo %i`;

function fixAllImports() {
    const filesToCheck = [
        './app/learn/course/start/components/Doubt.js',
        './app/learn/course/start/components/LetStart.js',
        './app/learn/course/start/page.js',
        './app/learn/recall/components/PreviewOutline.js',
        './app/learn/recall/start/components/QueAns.js'
    ];

    let totalFixed = 0;

    // Also search for additional files
    try {
        console.log('🔍 Searching for all JavaScript files with import issues...');

        function scanDirectory(dir) {
            const files = fs.readdirSync(dir);

            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    scanDirectory(filePath);
                } else if (file.endsWith('.js') && !file.includes('node_modules') && !file.includes('.next')) {
                    filesToCheck.push(filePath.replace(/\\/g, '/'));
                }
            });
        }

        scanDirectory('./app');
    } catch (error) {
        console.log('⚠️  Could not scan directories, using manual list');
    }

    // Remove duplicates
    const uniqueFiles = [...new Set(filesToCheck)];

    uniqueFiles.forEach(filePath => {
        try {
            if (!fs.existsSync(filePath)) {
                return;
            }

            let content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;

            // Calculate correct relative path based on file location
            const pathParts = filePath.split('/');
            let pathDepth = pathParts.length - 2; // -1 for filename, -1 for starting from app

            // Special handling for different directory depths
            if (filePath.includes('/components/')) {
                pathDepth = pathParts.filter(part => part !== '' && part !== '.').length - 1;
            }

            let correctPath = '';
            for (let i = 0; i < pathDepth; i++) {
                correctPath += '../';
            }
            correctPath += 'config/AiModels';

            // Replace various incorrect import patterns
            content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, `from '${correctPath}'`);
            content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, `from '${correctPath}'`);
            content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, `from '${correctPath}'`);
            content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g, `from '${correctPath}'`);

            // Handle import statements with multiple imports
            content = content.replace(/import\s*\{[^}]+\}\s*from\s*['"]\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g,
                (match) => match.replace('../../../config/AiModels', correctPath));
            content = content.replace(/import\s*\{[^}]+\}\s*from\s*['"]\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g,
                (match) => match.replace('../../../../config/AiModels', correctPath));
            content = content.replace(/import\s*\{[^}]+\}\s*from\s*['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/config\/AiModels['"]/g,
                (match) => match.replace('../../../../../config/AiModels', correctPath));

            // Also fix any references to AllAiModels that might remain
            content = content.replace(/AllAiModels/g, 'AiModels');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Fixed imports in: ${filePath} (depth: ${pathDepth}, path: ${correctPath})`);
                totalFixed++;
            }
        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error.message);
        }
    });

    console.log(`\n✨ Fixed ${totalFixed} files!`);
}

fixAllImports();
