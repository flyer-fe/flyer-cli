'use strict'
/**
 * 模块指令处理逻辑
 * @author jianmin3
 * 
 */
const co = require('co')
// const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const utils = require('../utils/utils')

module.exports = () => {
  // 要写入的的目标路径, 在没有参数的情况下使用
  let targetDir = process.cwd() + '/src/pages/'

  co(function* () {
    // process是一个全局对象，argv返回的是一组包含命令行参数的数组。
    // 第一项为”node” ，第二项为执行的js的完整路径，后面是附加在命令行后的参数
    let _arguments = process.argv.splice(2)
    // 用户定制模板参数
    let _customOptions = _arguments[1]
    // 拷贝的文件夹
    let copyDir = path.resolve(__dirname, '..') + '/templates'
    // 确定模块名称
    targetDir = _customOptions ? (targetDir + _customOptions) : (targetDir + '/module')
    // console.log(targetDir)

    // 验证文件夹是否存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir)
      console.log('文件夹不存在，我给你创建了一个哦！')
    }

    // 开始遍历文件夹
    utils.travelSync(copyDir, function (pathname, file) {
      if (pathname) {
        // console.log(targetDir + '/' + file)
        utils.copy(targetDir + '/' + file, pathname)
      }
    }, ['list.vue', 'form.vue', 'config.js'])
  })
}
