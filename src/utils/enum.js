module.exports = {
  path: {
    list: '/templates/list.vue',
    form: '/templates/form.vue',
    report: '/templates/report.vue',
    add: '/templates/add.vue'
  },
  rex: {
    PATH_REG: /^(advert|idea|contract|advertGroup)/
  },
  TEMPLATE_COMMAND_MAP: ['list', 'form', 'report']
}
