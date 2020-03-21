const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const commonPath = require('./common_path.js');

module.exports = {
    entry: commonPath.entryPath,
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: 'Hello Webpack bundled JavaScript Project',
            template: commonPath.htmlEntry,
            filename: 'index.html'
        }),
        new LoadablePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { module: true } }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                loader: ['babel-loader']
            },
            {
                test: [/\.js$/, /\.mjs$/],
                loader: require.resolve('babel-loader')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader'
                // options: {
                //     outputPath: 'assets'
                // }
            }
        ]
    },

    output: {
        filename: '[name].bundle.js',
        path: commonPath.outpath
        // publicPath: '/assets/'
    }
};
