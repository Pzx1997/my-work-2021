const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode:'none',
    entry: {
        index: './测试promise.js'
    },
    output: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [

    ]
}