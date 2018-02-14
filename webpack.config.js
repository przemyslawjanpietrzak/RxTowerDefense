var path = require('path');
var webpack = require('webpack');

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
        loaders: [{
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
          'createjs': 'easeljs/lib/easeljs'
        })
    ].concat(isProduction ? new webpack.optimize.UglifyJsPlugin(): [])
};