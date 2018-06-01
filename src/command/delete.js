'use strict'
/**
 * 删除文件指令实现逻辑
 * @author jianmin3
 * 需要指明文件路径
 */

const co = require('co')

module.exports = () => {
  // 要写入的的目标路径, 在没有参数的情况下使用
  let targetPath = process.cwd()

  co(function* () {
    console.log('自己手动删吧，这个功能我不打算实现了 ^_^')
  })
}
