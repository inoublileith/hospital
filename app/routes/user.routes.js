const controller = require('../controllers/user.controller')

module.exports = function (app) {
  app.get('/api/user/:id', controller.findOne)
  app.get('/api/user/', controller.findAll)
  app.post('/api/user/', controller.create)
  app.put('/api/user/:id', controller.update)
  app.delete('/api/user/', controller.deleteAll)
  app.delete('/api/user/:id', controller.delete)
}
