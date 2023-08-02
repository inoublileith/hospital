const controller = require('../controllers/infermier.controller')

module.exports = function (app) {
  app.get('/api/infermier/:id', controller.findOne)
  app.get('/api/infermier/', controller.findAll)
  app.post('/api/infermier/', controller.create)
  app.put('/api/infermier/:id', controller.update)
  app.delete('/api/infermier/', controller.deleteAll)
  app.delete('/api/infermier/:id', controller.delete)
}
