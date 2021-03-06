var path = require("path"),
    openBrowserWebpackPlugin = require('open-browser-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/js/dui.js',
    output: {
        path: __dirname + "/dist/", // 输出文件的保存路径
        publicPath: "/dist/",
        filename: 'js/dui.js', // 输出文件的名称
        library: 'Dui',
        libraryTarget: 'umd'
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?presets[]=es2015'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader", {publicPath: "../"})
            },
            {
                test: /\.html$/,
                loader: "html?minimize=true"
            }
        ]
    },
    htmlLoader: {
        root: path.resolve(__dirname, 'src/js/component/template')
    },
    devServer: {
        stats: { colors: true },
        publicPath: "/dist/",
        contentBase: 'demo',
        port: 8070,
        watch: true,
        progress: true,
        "display-error-details": true
    },
    plugins: [
        new ExtractTextPlugin("css/dui.css"),
        new openBrowserWebpackPlugin({ url: 'http://localhost:8070' })
    ]
}