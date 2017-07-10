module.exports = {
    entry: './game/index.js',
    output: {
        filename: 'dist.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        ]
    }
}