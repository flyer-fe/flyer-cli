'use strict'
/**
 * 列表|表单|报表 模板指令实现逻辑
 * @author jianmin3
 * 
 * 用户输入结构,例子
 * 【flyer list 模块】  或者  【flyer list 模块 [file_name]】  再或者  【flyer list】
 * 
 * 支持3种输入方式：
 * 第一种，[指令+模块]，会将生成的文件写入到默认的[src/pages/模块]路径下面，毕竟是表单这种文件只有模块下用得到
 * 第二种，[指令+模块+文件名] 会将生成的文件写入到默认的[src/pages/模块]路径下面
 * 第三种，[指令]会将生成的文件写入到当前的目录下面
 * 第四种，[指令+模块+文件名+UI] 会将生成的文件写入到默认的[src/pages/模块]路径下面，利用handlebars根据UI类型生成对应的模板
 */

const co = require('co')
// const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const utils = require('../utils/utils')
const config = require('../utils/enum')

module.exports = () => {
  // 要写入的的目标路径, 在没有参数的情况下使用
  let targetPath = process.cwd()

  co(function* () {
    // process是一个全局对象，argv返回的是一组包含命令行参数的数组。第一项为”node”，第二项为执行的js的完整路径，后面是附加在命令行后的参数
    let _arguments = process.argv.splice(2)
    // 用户输入的指令
    let _customCommand = _arguments[0]
    // 用户输入路劲
    let _customPath = _arguments[1]
    // 用户定制模板参数
    let _customOptions = _arguments[2]
    // 需要拷贝的文件路劲
    let copyPath = path.resolve(__dirname, '..') + config.path[_customCommand]

    // console.log(_arguments)
    // 校验创建模板时用户是否输入路径
    if (_customPath) {
      // 这一步不能拼接文件名称，因为需要验证文件夹是否有效
      targetPath = targetPath + '/src/pages/' + _customPath
      // 要找一下这个路径是否有效，如果无效，需要创建一个文件夹
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath)
        console.log(chalk.red('文件夹不存在，我给你创建了一个!'))
      }
    }

    // 文件名取决于用户输入的第三个参数，如果没有就是默认
    let _fileName = ''
    if (_customCommand === 'form') { // form模板的名字特殊处理
      if (_customOptions) {
        _fileName = _customOptions
      } else {
        _fileName = 'create'
      }
    } else {
      if (_customOptions) {
        _fileName = _customOptions
      } else {
        _fileName = _customCommand
      }
    }
    // targetPath = targetPath + '/' + (_customCommand === 'form' ? (_customOptions ? _customOptions : 'create') : (_customOptions ? _customOptions : _customCommand)) + '.vue'
    targetPath = targetPath + '/' + _fileName + '.vue'
    utils.copy(targetPath, copyPath, {
      element: true
    })
  })
}
