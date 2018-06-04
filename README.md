[![npm][npm]][npm-url]
[![node][node]][node-url]

# flyer-cli

> * 商业端脚手架-飞鸟
> * 寓意：自由的飞翔，意味着可以轻松自由的构建项目并生成文件

# install

> npm install flyer-cli -g

# API

> ## 脚手架包含了⑦种命令:
> * add: 添加模板，没有任何特性的模板
> * delete: 删除模板
> * init: 初始化项目
> * list: 添加一个列表模板
> * form: 添加一个表单模板
> * report: 添加一个报表模板
> * module: 初始化一个模块
> ## 说明:
> flayer-cli基于商业端构建的一款脚手架，解决在生产过程中带来的重复劳动，以上模板均可接受用户输入，提供了指令解析功能，目前版本只支持文件路径解析，用户可指明模板生成的路径，确保文件及模块的唯一性;
>

# 示例及详细说明


add （添加一个模板）
```
flyer add <module>
flyer add <module> <file_name>
flyer add
```

>
> * 没有任何特性的模板，你所知道的一个普普通通的vue模板，还有一些我们经常用的钩子函数一并帮你生成，你所要做的就是实现你的业务逻辑
> * ```flyer add <module>``` 命令，将默认添加到src/pages路径下的模块中，文件名称使用默认的templet.vue
> * ```flyer add <module> <file_name>``` 命令，同样，也是将默认添加到src/pages路径下的模块中，不过你可以自定义文件名称
> * flyer add 命令，在当前目录下生成templet.vue文件
>

list（初始化一个列表模板）
```
flyer list <module>
flyer list <module> <file_name>
flyer list
```

>
> * 创建一个列表页，包含了查询、列表项、分页三个部分；
> * ```flyer list <module>```命令，将默认添加到src/pages路径下的模块中，文件名称使用默认的list.vue，如果模块不存在，则会自动生成一个文件夹，作为模块文件夹;
> * ```flyer list <module> <file_name>```命令，同样，也是将默认添加到src/pages路径下的模块中，不过你可以自定义文件名称
> * ```flyer list``` 命令，在当前目录下生成list.vue文件

form（初始化一个表单模板）
```
flyer form <module>
flyer form <module> <file_name>
flyer form
```

>
> * 创建一个表单页，包含了表单、提交俩个部分；
> * 使用方式同list指令，不同的是，如果你不指定文件名称，则默认文件名称为create.vue
>

report（初始化一个报表模板）
```
flyer report <file_name>
flyer report
```

>
> * 创建一个报表页面；
> 



module（初始化一个模块）
```
flyer module <module_name>
```

>
> * 初始化一个模块，module_name为模块名称，你也可以理解为文件夹名称；
> * 模块内容包含 ```列表页(list.vue) | 表单页(form.vue) | 模块配置文件(config.js)```三个部分
> * module_name默认写入位置```src/pages/module_name```，如果项目结构不是```src/pages/...```，请输入具体的模块路劲，确保程序成功写入文件；
> * 在我看来第一种方式就可以满足你的需求，因为模块结构及模块文件结构仅在业务模块中使用；
>

init（初始化一个vue项目）
```
flyer init <project_name>
```

>
> * 看到这里，才到了脚手架的核心部分，使用```flyer init <project_name>```初始化你的spa项目；
> * 你也可以直接使用```flyer-fe/flyer-quickstart```vue-cli模板来初始化你的spa项目，具体使用[请看这里](https://github.com/flyer-fe/flyer-quickstart);
> * flyer-quickstart会根据你的喜好来预装```element-ui or quasar```UI框架，这样一来你可以更快速的构建你的spa应用，如果你不喜欢，也可以将其干点，但是你枉费了我的一片苦心；
>


[npm]: https://img.shields.io/npm/v/flyer-cli.svg
[npm-url]: https://www.npmjs.com/package/flyer-cli

[node]: https://img.shields.io/node/v/flyer-cli.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/flyer-cli.svg
[deps-url]: https://david-dm.org/flyer-cli
