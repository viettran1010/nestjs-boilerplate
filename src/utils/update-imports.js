const fs = require('fs');
const path = require('path');

const updateImports = (startPath, oldFolderName, newFolderName) => {
  const files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      updateImports(filename, oldFolderName, newFolderName); // Recurse into subdirectories
    } else if (filename.indexOf('.ts') >= 0) {
      let content = fs.readFileSync(filename, 'utf8');
      const newContent = content.replace(new RegExp(oldFolderName, 'g'), newFolderName);
      if (content !== newContent) {
        fs.writeFileSync(filename, newContent, 'utf8');
        console.log(`Updated imports in ${filename}`);
      }
    }
  });
};

// Usage: updateImports('./src', 'menu-options', 'menu_options');