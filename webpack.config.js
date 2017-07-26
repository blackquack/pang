const path = require('path');

module.exports = {
    entry: './game/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'dist.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        ]
    },
    externals: {
        'Phaser': 'Phaser'
    }
}