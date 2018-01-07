const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: "source-map", // any "source-map"-like devtool is possible
    devServer: {
        contentBase: "./build",
        historyApiFallback: true
    },
});