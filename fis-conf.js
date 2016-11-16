/**
 * 基本配置
 */
// 配置按需编译
fis.set('project.files', ['example/*.html', 'server.conf', '/test/**', '/mock/**']);

fis.set('project.ignore', ['dist/**']);

// 配置 fis-components 安装目录
fis.set('component.dir', 'fis-components');

// 配置 server.conf 输出目录
fis.match('server.conf', {
    release: '/config/server.conf'
});

// 将 html 文件加入到 RESOURCE_MAP 中
fis.match('*.html', {
    useMap: true
});

// 模拟数据文件名不需要 MD5
fis.match('/mock/**', {
    useHash: false,
    isMod: false,
    skipBrowserify: true
}, true);


// 扩展对『资源定位』的能力
fis.match('**.html', {
    parser: fis.plugin('html-uri')
});

fis.set('project.fileType.text', 'ts,es,es6,js');



/**
 * 设置忽略的文件
 * 参考：http://fis.baidu.com/fis3/docs/api/config-props.html#project.ignore
 */
fis.set('project.ignore', [
    'package.json',
    '.git/**',
    '.svn/**',
    '.idea/**',
    'output/**',
    'node_modules/**',
    'bower_components/**',
    'psd/**'
]);


/**
 * 样式相关
 * 1. 将 sass、scss、less 文件编译为 css 文件
 * 2. 属性或值自动补全前缀
 * 3. 精简压缩 css 文件
 * 4. 文件名使用 md5
 */

// 1. 将 sass、scss、less 文件编译为 css 文件
// 强烈建议使用 scss 作为 css 的预处理器！！！！
fis.match('{**.sass,**.scss}', {
    parser: fis.plugin('node-sass'),
    rExt: '.css'
});

fis.match('**.less', {
    parser: fis.plugin('less-2.x'),
    rExt: '.css'
});

// 2. 属性或值自动补全前缀
fis.match('{**.scss,**.sass,**.less,**.css}', {
    //preprocessor: fis.plugin('cssprefixer')
});

// 3. 精简压缩 css 文件
fis.media('prod').match('**.css', {
    // clean-css 为 fis 内置插件，无需安装
    optimizer: fis.plugin('clean-css')
});




/**
 * 脚本相关
 * 1. 将 es6 转换为 es5
 * 2. 将 jsx 转换为 js
 * 3. 校验 js 文件
 * 4. 压缩混淆 js 文件
 */

// 1. 将 es6, jsx 转换为 es5
fis.match('{**.js,**.es6,**.jsx}', {
    parser: fis.plugin('es6-babel', {
        sourceMaps: true
    }),
    rExt: '.js'
});

// 2. 校验 js 文件
fis.match('{**.js,**.es6,**.jsx,**.js}', {
    lint: fis.plugin('jshint', {
        // 使用汉语提示
        i18n: 'zh-CN'
    })
});

fis.media('prod').match('{**.js,**.es6,**.js}', {
    optimizer: fis.plugin('uglify-js', {
        compress: {
            // 保留未被用到的变量或函数
            unused: false,

            // 移除调试信息
            drop_console: true,
            drop_debugger: true
        },
        sourceMap:true
    })
});

// 4. 添加css和image加载支持
fis.match('*.{js,jsx,ts,tsx,es,es6}', {
    preprocessor: [
        fis.plugin('js-require-css'),
        fis.plugin('js-require-file', {
            useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
        })
    ]
});


/**
 * 模块化相关
 * 1. 配置需要模块化的文件
 * 2. 配置模块化配置项
 * 3. 不需要模块化的文件
 */

// 1. 配置需要模块化的文件
fis.match('{**.es6,**.jsx,**.js}', {
    isMod: true
});

// 2. 配置项
fis.hook('commonjs', {
    // 配置路径
    baseUrl: '/',

    // 配置包信息
    packages: [],

    // 配置模块别名
    paths: {

    },

    // 配置 shim
    shim: {},

    extList: ['.es6', '.js', '.jsx', '.es', '.ts', '.tsx']
});


// 3. 不需要模块化的文件
fis.match('**/require.js', {
    isMod: false
});
fis.match('**/modJS.js', {
    isMod: false
});



/**
 * 输出依赖
 * 1. 分析 fis 的静态资源关系表，输出依赖文件
 * 2. 输出模块化时需要的资源表
 */
fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        // 输出资源表类型
        // 根据你所使用的模块加载器进行配置
        resourceType: 'mod', // 取值[amd | cmd | mod | system]
        useInlineMap: true // config 配置文件内联输出
    }),

    packager: fis.plugin('deps-pack', {})
});


fis.match('/node_modules/**.js', {
    isMod: true,
    useSameNameRequire: true
});
fis.unhook('components');
//fis.hook('npm');


fis.hook('node_modules', {
    shimBuffer: false
});

/*
//关闭资源定位
fis.match('youfolder/*.{css,js,html}',  {
    standard: false
});
*/