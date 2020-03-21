const { resolve } = require('path');

module.exports = {
    entryPath: resolve(__dirname, '../src/index.js'),
    htmlEntry: resolve(__dirname, '../src/index.html'),
    outpath: resolve(__dirname, '../', 'dist'),
    jsxResolvePath: resolve(__dirname, '../', 'src')
};
