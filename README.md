# vue-touch-add-className

document touch event add className

标签触摸添加 className 默认 active 可以传参数

样式自己定义

比如

```
.active{
	background:red;
}
```


#使用

npm install --save-dev vtac

import Vue from 'vue'

import vtac from 'vtac'

Vue.use(vtac)

```HTML
<li v-vtac>touch</li>
<li v-vtac="'className'"></li>
```