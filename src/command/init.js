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
const ora = require('ora')

const utils = require('../utils/utils')
const config = require('../utils/enum')
// 子进程
const childProcess = require('child_process')
// 从git拉去依赖库
const download = require('download-git-repo')
// 组件库地址
const template = 'ElemeFE/element'
const ui_command = 'npm install element-ui --save'

module.exports = () => {
  // 项目的根路径
  let projectPath = process.cwd()
  let _arguments = process.argv.splice(2)
  let _customProject = _arguments[1] || 'template-project'
  let _vueCommand = ['init', 'webpack', _customProject]
  let _vueOptions = {
    stdio: ['pipe', 'pipe', 'pipe']
  }
  
  // 子进程实例
  let _vue = childProcess.spawn('vue', _vueCommand, _vueOptions)
  // 将子进程的输出(stdout)输出到父进程的stdout中，但是一些进度就无法获取了
  _vue.stdout.pipe(process.stdout)

  // 子进程挂载事件
  _vue.stdout.on('data', (data) => {
    // console.log(data.toString())
    let dataString = data.toString()
    if (dataString.indexOf('Documentation') > 0) {
      // downloadAndGenerate(template, _customProject)
      installTemplate(ui_command, _customProject)
    }
  })
  _vue.stdout.on('end', () => {
    console.log('退出子进程')
  })
  _vue.stderr.on('data', (data) => {
    console.log(`安装错误信息：${data}`)
  })
  _vue.on('exit', (code) => {
    console.log(`即将退出，退出码：${code}`)
  })
  _vue.on('close', (code) => {
    console.log(`子进程退出码：${code}`)
  })
  // 获取用户输入
  process.stdin.on('readable', () => {
    // 读进来的是一个buffer对象
    var chunk = process.stdin.read()
    // 解析成字符串
    var chunkString = chunk && chunk.toString("utf-8")

    if (typeof chunk === 'string') {
      chunk = chunk.slice(0, -2)
    }

    if (chunk === '') {
      _vue.stdin.write('\n')
      return
    }

    if (chunk !== null) {
      if (chunk) {
        if (chunkString === 'y') {
          _vue.stdin.write('\n')
        } else {
          _vue.stdin.write(chunkString)
        }
      }
    }
  })

  /**
   * 使用git命令下载依赖库
   * @param {string} template git路径
   * @param {string} dir      文件夹路径
   * 
   */
  function downloadAndGenerate (template, dir) {
    dir = dir + '/src/components'
    var spinner = ora('downloading template ...')
    spinner.start()
    download(template, dir, { clone: false }, function (err) {
      spinner.stop()
      if (err) {
        console.log(chalk.red(err.message.trim()))
      }
      _vue.kill()
      process.exit()
    })
  }

  /**
   * 使用npm安装公共平台依赖库
   * @param {string} dir 文件夹名称
   * 
   */
  function installTemplate (command, dir) {
    let cwd = projectPath + '/' + dir
    var spinner = ora('Installing components ...')
    spinner.start()
    childProcess.exec(command, {cwd: cwd}, (err, stdout, stderr) => {
      spinner.stop()
      if (err) {
        console.log(chalk.red(err.message.trim()))
      }
      _vue.kill()
      process.exit()
    })
  }

  /**
   * 更新webpack build文件夹配置项
   * 
   */
  function updateWebpackBuild () {
    
  }

  /**
   * 更新webpack config文件夹配置项
   * 
   */
  function updateWebpackConfig () {

  }

  /**
   * 更新项目入口文件
   * 
   */
  function updateProjectMainfile () {

  }

  /**
   * 更新项目视图入口文件
   * 
   */
  function updateProjectAppfile () {

  }

  /**
   * 将依赖库名写入package.json文件
   * 
   */
  function updatePackagefile () {

  }

  /**
   * 子进程执行 npm install 可有可无
   * 
   */
  function npmInstall () {

  }
}
