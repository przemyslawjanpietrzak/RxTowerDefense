var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.npm_lifecycle_event;
var isProduction = env.includes('production')

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        filename: './dist/bundle.js'
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
                'node_modules',
                '**/*spec.ts',
            ]
        }, {
            test: /\.js$/,
            loader: 'ts-loader',
            include: [
                path.resolve(__dirname, './src')
            ],
            exclude: [
                /node_modules/,
            ]
        },]
    },
    devtool: !isProduction ? 'source-map' : 'none',
    plugins: [
        new webpack.ProvidePlugin({
          'createjs': 'easeljs/lib/easeljs',
          THREE: 'three', // TODO
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