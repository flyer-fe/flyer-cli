'use strict'
/**
 * 模块指令处理逻辑
 * @author jianmin3
 * 
 * 模块指令会帮助用户创建一个模块文件夹，其中包含了form表单文件，list列表文件，和一个config模块配置文件
 * 模块指令会根据用户的输入来确定模块名称，如：
 * 【flyer module [module_name]】   或者   【flyer module】
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
    // 用户输入的指令
    let _customCommand = _arguments[0]
    // 用户输入路劲 - 就是模块名称
    let _customPath = _arguments[1]
    // 用户定制模板参数
    let _customOptions = _arguments[2]
    // 拷贝文件的目标文件夹
    let copyDir = path.resolve(__dirname, '..') + '/templates'
    // 确定模块名称
    targetDir = _customPath ? (targetDir + _customPath) : (targetDir + 'module')
    // console.log(targetDir)

    // 验证模块文件夹是否存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir)
      console.log('文件夹不存在，我给你创建了一个哦！')
    }

    // 开始遍历文件夹
    utils.travelSync(copyDir, function (pathname, file) {
      if (pathname) {
        // console.log(targetDir + '/' + file)
        // console.log(pathname)
        utils.copy(targetDir + '/' + file, pathname)
      }
    }, ['list.vue', 'form.vue', 'config.js'])

    // 模块创建完成后，自动生成模块的mock数据
    let _projectName = process.cwd().split('/').pop()
    let _mockDir = process.cwd() + '/mock/' + _projectName
    // console.log(_mockDir)
    // 创建项目mock根目录
    if (!fs.existsSync(_mockDir)) {
      fs.mkdirSync(_mockDir)
      console.log('mock根目录文件夹不存在，我给你创建了一个哦！')
    }
    // 创建模块目录
    _mockDir = _mockDir + '/' + (_customPath ? _customPath : 'module')
    if (!fs.existsSync(_mockDir)) {
      fs.mkdirSync(_mockDir)
      console.log('模块目录文件夹不存在，我给你创建了一个哦！')
    }
    // 将mock模板写入目录
    utils.travelSync(copyDir, function (pathname, file) {
      if (pathname) {
        // console.log(_mockDir + '/' + file)
        // console.log(pathname)
        utils.copy(_mockDir + '/' + file, pathname)
      }
    }, ['mock.js'], ['Create.js', 'List.js'])
  })
}
