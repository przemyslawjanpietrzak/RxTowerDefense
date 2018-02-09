var path = require('path');
var webpack = require('webpack');


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
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
          'createjs': 'easeljs/lib/easeljs'
        })
    ]  
};