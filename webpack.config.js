const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
        
    },
    devtool: "source-map",
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist'),
        },
        port: 3010,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
              test: /\.(s[ac]|c)ss$/i,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../'
                  }
                },
                'css-loader',
                "postcss-loader",
                'sass-loader',
              ]
              },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: "asset",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html", 
          }),
          new MiniCssExtractPlugin({
            filename: 'assets/css/[name].bundle.css'
          }),
    ],
};