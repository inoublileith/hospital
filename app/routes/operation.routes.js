const controller = require('../controllers/operation.controller')

module.exports = function (app) {
  app.get('/api/operation/:id', controller.findOne)
  app.get('/api/operation/', controller.findAll)
  app.post('/api/operation/', controller.create)
  app.put('/api/operation/:id', controller.update)
  app.delete('/api/operation/', controller.deleteAll)
  app.delete('/api/operation/:id', controller.delete)
}
