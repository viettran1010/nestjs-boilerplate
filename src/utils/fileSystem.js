const fs = require('fs');
const path = require('path');

function renameFolder(oldPath, newPath) {
  fs.renameSync(oldPath, newPath);
}

// Rename the folder from 'user-permissions' to 'user_permissions'
renameFolder(path.join(__dirname, '../user-permissions'), path.join(__dirname, '../user_permissions'));