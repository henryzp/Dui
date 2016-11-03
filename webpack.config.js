module.exports = {
    entry: './src/js/dui.js',
    output: {
        path: "./dist/js", // 输出文件的保存路径
        filename: 'dui.js' // 输出文件的名称
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel?presets[]=es2015'],
            exclude: /node_modules/
        }]
    }
}