### 项目说明

该项目为小企业的组件工程

### 组件模块

- button

### 项目运行

- npm install
- fis3 server clean
- fis3 server start
- fis3 release -wL 

### 为什么不用gulp和webpack？

测试了一下，gulp-connect的liveReload并没有起作用，按照这个[issue](https://github.com/AveVlad/gulp-connect/issues/153)，运行的结果并不能自动刷新页面。

而webpack，比较适合模块化，它对于css的多个文件合并、编译并不是太理想。

较理想的是gulp+webpack（服务器利用webpack，监听文件变化利用gulp），但目前还未找到合适的方案。

### 打包

```
fis3 release build -d ./dist
```