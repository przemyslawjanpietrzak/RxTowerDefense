const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getPath = file => path.resolve(__dirname, file);
const env = process.env.npm_lifecycle_event;
const isProduction = env.includes('production')

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        filename: './bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            include: [
                path.resolve(__dirname, './src')
            ],
            exclude: [
                getPath('node_modules'),
                getPath('**/*spec.ts'),
            ]
        }, {
            test: /\.js$/,
            loader: 'ts-loader',
            include: [
                getPath('./src'),
            ],
            exclude: [
                getPath('node_modules'),
            ]
        },]
    },
    optimization: {},
    devtool: !isProduction ? 'source-map' : 'none',
    plugins: [
        new webpack.ProvidePlugin({
          THREE: 'three',
        })
    ].concat(isProduction ? [] : [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]),
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        hot: true,
        inline: true,
    },
};