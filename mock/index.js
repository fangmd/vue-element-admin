const Mock = require('mockjs')

module.exports = function(app) {
  // 登陆接口测试底层错误提示是否正常
  //   app.post('/admin/manager_login', function(rep, res) {
  //     const userData = require('./json/error/errormsg.json')
  //     delete require.cache[require.resolve('./json/error/errormsg.json')]
  //     res.json(userData)
  //   })
  // login
  app.post('/admin/manager_login', function(rep, res) {
    const userData = require('./json/admin/login.json')
    delete require.cache[require.resolve('./json/admin/login.json')]
    res.json(userData)
  })
  // user side menu(接口格式和登陆一样, need token)
  app.get('/admin/menu_list', function(rep, res) {
    const userData = require('./json/admin/login.json')
    delete require.cache[require.resolve('./json/admin/login.json')]
    res.json(userData)
  })
}
