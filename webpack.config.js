const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "main.css",
});
module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
        // publicPath: "/assets/"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
                exclude : path.resolve(__dirname,'src/index.html')
            },{
                test: /\.(jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }, {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                },
            },{
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    },{
                        loader: "postcss-loader"
                    },{
                        loader: "sass-loader",
                        options: {
                            includePaths: ['node_modules', 'node_modules/@material/*']
                                .map((d) => path.join(__dirname, d))
                                .map((g) => glob.sync(g))
                                .reduce((a, c) => a.concat(c), [])
                        }
                    }],
                    fallback: "style-loader"
                })
            }

        ],
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};