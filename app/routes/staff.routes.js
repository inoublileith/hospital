const controller = require('../controllers/staff.controller')

module.exports = function (app) {
  app.get('/api/staff/:id', controller.findOne)
  app.get('/api/staff/', controller.findAll)
  app.post('/api/staff/', controller.create)
  app.put('/api/staff/:id', controller.update)
  app.delete('/api/staff/', controller.deleteAll)
  app.delete('/api/staff/:id', controller.delete)
}
