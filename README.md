### 项目说明

该项目为小企业的组件工程

### 组件模块

- [button](./doc/button.md)
- [modal](./doc/modal.md)

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

