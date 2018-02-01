'use strict'
/**
 * 列表|表单|报表 模板指令实现逻辑
 * @author jianmin3
 * 
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
      // 验证用户输入文件夹是否有效
      if (config.rex.PATH_REG.test(_customPath)) {
        // 这一步不能拼接文件名称，因为需要验证文件在是否有效
        targetPath = targetPath + '/src/pages' + utils.splitPath(_customPath)
        // console.log(targetPath)
        // 要找一下这个路径是否有效，如果无效，需要创建一个文件夹
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath)
          console.log(chalk.red('模块文件夹不存在，我给你创建了一个!'))
        }
        targetPath = targetPath + '/' + (_customCommand === 'form' ? 'create' : _customCommand) + '.vue'
      } else {
        console.log(chalk.red('参数不符合解析规范，开头必须为contract|advertGroup|advert|idea/xxxx'))
        return
      }
    } else {
      targetPath = targetPath + '/' + _customCommand + '.vue'
    }
    utils.copy(targetPath, copyPath)
  })
}
