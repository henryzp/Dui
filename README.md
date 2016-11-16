### 项目说明

该项目为小企业的组件工程

### 组件模块

- [button](./doc/button.md)
- [modal](./doc/modal.md)
- [tip](./doc/tip.md)
- [select] (./doc/select.md)

### 环境

- gulp (构建项目，生成dist文件)
- webpack (打包js，集成到gulp中)
- fis3（用来跑项目，注意：不要将node升级到7.0，不然会有问题，建议6.x版本）

### 项目运行

- npm install
- fis3 server clean
- fis3 server start
- fis3 release -wL 
- 访问`http://localhost:8080/example`

### 打包

```
npm run build
```

### 打包文件说明

- dui.all.css 打包了normalize、滚动条样式和组件的css
- dui.all.min.css 上面的压缩版
- dui.css 打包了组件的css
- dui.min.css 上面的压缩版
- dui.js 提供组件的JS
- dui.min.js 上面的压缩版

### 如何在项目中使用

- 传统方式

引用dist目录下的css以及js文件，写法大概如下：

```html
<link rel="stylesheet" href="dui.css"/>
<script src="dui.js"></script>
```

- es6的写法

webpack的配置如下：

```
{ test: /\.js$/, loader: 'babel', exclude: /node_modules(?!\/Dui)/ },
```

在js中只要这样写就行：

```
import "Dui/src/css/dui.scss";
import { Modal } from 'Dui';

Modal.alert(123);
```

### 浏览器兼容

目前我只测试了chrome，所以不确定在IE下能不能兼容。有bug给我提issue吧！



