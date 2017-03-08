### button的风格

目前支持以下几种：

- dui-btn
- dui-btn-info、dui-btn-info-bordered 
- dui-btn-warning、dui-btn-warning-bordered
- dui-btn-danger 

![button](images/button.png)

```html
<div>
    <a class="dui-btn-info" href="javascript:;">常用</a>
    <a class="dui-btn-warning" href="javascript:;">重要</a>
    <a class="dui-btn-info-bordered" href="javascript:;">常用</a>
    <a class="dui-btn-warning-bordered" href="javascript:;">重要</a>
    <a class="dui-btn" href="javascript:;">默认</a>
    <a class="dui-btn-warning dui-btn-has-icon" href="javascript:;">
        <i class="iconfont icon-sousuo1"></i>图标按钮
    </a>
    <a class="dui-btn-danger disabled" href="javascript:;">警示</a>
    <a class="dui-btn-danger disabled dui-btn-has-icon" href="javascript:;">
        <i class="iconfont icon-tixing"></i>警示
    </a>
</div>
```

### button的尺寸

- dui-btn-large （大）
- dui-btn-small （小）
- dui-btn-mini  （迷你）

normal不需要添加类，当其他尺寸时，只要组合`风格`和`尺寸`即可，如：

```html
<a class="dui-btn dui-btn-large" href="javascript:;"></a>
```

### button组的常规间距

- 间距10px的写法：

```html
<div class="dui-btn-list-g10">
     <a class="dui-btn-info" href="javascript:;">确定</a><a class="dui-btn-info" href="javascript:;">取消</a>
</div>
```

确保外面的类有一个`dui-btn-list-g10`就OK了。

- 间距5px的写法：

```html
<div class="dui-btn-list-g5">
     <a class="dui-btn-info" href="javascript:;">确定</a><a class="dui-btn-info" href="javascript:;">取消</a>
</div>
```

确保外面的类有一个`dui-btn-list-g5`就OK了。

### button的disable

只要在类后面加一个`disabled`就能让元素置灰，不可点击，如：

```html
 <a class="dui-btn-danger disabled" href="javascript:;">警示</a>
```

### button与icon

如：

```html
<a class="dui-btn-warning dui-btn-has-icon" href="javascript:;">
     <i class="iconfont icon-sousuo1"></i>图标按钮
</a>
```

<mark>需要注意的是，要对容器加`dui-btn-has-icon`</mark>，且不考虑small和mini的情况

### 需要自定义宽度的button

一般分为两种

- 定死宽度为100，只要加`dui-btn-w100`这个类即可，如:

```html
<a class="dui-btn dui-btn-w100" href="javascript:;">下次再说</a>
```

- 自己加宽度，只要加`dui-btn-special`这个类即可，如：

```html
<a class="dui-btn dui-btn-special" style="width: 80px;" href="javascript:;">测试</a>
```