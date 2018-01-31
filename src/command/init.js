'use strict'
/**
 * 项目初始化指令实现逻辑
 * @author jianmin3
 * 
 */
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const utils = require('../utils/utils')
const config = require('../utils/enum')

// 项目的根路径
let projectPath = process.cwd()

module.exports = () => {
  co(function* () {
    let _arguments = process.argv.splice(2)
    let _customProject = _arguments[1]
    let _author
    let _version

    // 分步接收用户输入的参数
    let _projectName = yield prompt(_customProject ? 'Project Name: (' + _customProject + ') y/n  ' : 'Project Name: ')
    // 终止用户输入
    process.exit()

  })
}
