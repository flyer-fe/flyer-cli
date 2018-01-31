/**
 * 模块配置文件
 * 
 */
import moment from 'moment'
import { comma, decimal, percent, change } from 'src/common/number'

module.exports = {
  format: {
    formatCreateTime(row, column) {
      return moment(row.createTime).format('YYYY-MM-DD')
    },
    commaNumber(row, col) {
      return row[col.property] === -1 ? '-' : comma(row[col.property])
    },
    decimalNumber(row, col) {
      return row[col.property] === -1 ? '-' : decimal(row[col.property])
    },
    percentNumber(row, col) {
      return row[col.property] === -1 ? '-' : percent(row[col.property])
    },
    accurateTwo(row, col) {
      return row[col.property] === -1 ? '-' : change(row[col.property], 0.01, 2)
    },
    addUnit(row, col) {
      return row[col.property] === null ? '-' : (row[col.property] === 0 ? 0 : row[col.property] + '‰')
    },
    formatDeliveryTime(time) {
      return moment(time).format('YYYY-MM-DD')
    }
  }
}
