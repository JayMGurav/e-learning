const webpackMerge = require('webpack-merge');
const commonConfig = require('./build-utils/webpack.common.js');

module.exports = (idk, options) => {
    console.log(`options mode:${options.mode}`);
    const envConfig = require(`./build-utils/webpack.${options.mode}.js`);
    return webpackMerge(commonConfig, envConfig);
};
