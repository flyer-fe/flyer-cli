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

const childProcess = require('child_process')

// 项目的根路径
let projectPath = process.cwd()

module.exports = () => {
  co(function* () {
    let _arguments = process.argv.splice(2)
    let _customProject = _arguments[1] || 'template-project'
    let _vueCommand = ['init', 'webpack', _customProject]
    let _options = {
      stdio: ['pipe', 'pipe', 'pipe']
    }

    // let _path = path.resolve(__dirname, '../../') + '/node_modules/vue-cli/bin/vue-init'
    // childProcess.exec('vue init webpack nihao', function (err, stdout, stderr) {
    //   console.log(err)
    //   console.log(stdout)
    //   console.log(stderr)
    // })

    let _vue = childProcess.spawn('vue', _vueCommand, _options)
    // 将子进程的输出(stdout)输出到父进程的stdout中，但是一些进度就无法获取了
    _vue.stdout.pipe(process.stdout)

    _vue.stdout.on('data', (data) => {
      // console.log(data.toString())
      let dataStr = data.toString('utf-8')
      if (dataStr.indexOf('Installing') > 0) {
        console.log('Installing')
      } else if (dataStr.indexOf('Documentation') > 0){
        _vue.stdin.write('end')
      }
    })
    _vue.stdout.on('end', () => {
      console.log('退出子进程')
      process.stdout.write('end')
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
        chunk = chunk.slice(0, -2);
        process.stdout.write(`stringLength:${chunk.length}\n`);
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
    process.stdin.on('end', () => {
      process.stdout.write('end')
    })

    // vue.stdin.write('/n')
    // 分步接收用户输入的信息
    // let _projectName = yield prompt(_customProject ? 'Project Name: (' + _customProject + ') y/n  ' : 'Project Name: ')
    // // 确认项目名称
    // if (_customProject) {
    //   if (_projectName === 'y') {
    //     _projectName = _customProject
    //   } else if (_projectName === 'n') {
    //     _projectName = yield prompt('Project Name: ')
    //   } else {
    //     _projectName = 'new project'
    //   }
    // }
    // // 作者
    // _author = yield prompt('Author: ')
    // // 版本
    // _version = yield prompt('Version: (1.0.0) y/n ')
    // if (_version === 'n') {
    //   _version = yield prompt('Version: ')
    // }
    // console.log(_projectName, _author, _version)
    // // 终止用户输入
    // process.exit()

  })
}
