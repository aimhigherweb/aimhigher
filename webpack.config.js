
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }             
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ]
};