const controller = require('../controllers/position.controller')

module.exports = function (app) {
  app.get('/api/salles/position/:id', controller.findByEtat)
  app.get('/api/position/', controller.findAll)
  app.get('/api/positions/:id', controller.find)
  app.get('/api/positions/:id', controller.find)
  app.get('/api/today/:id', controller.findByDate)
  app.post('/api/position/', controller.create)
  app.put('/api/position/:id', controller.update)
  app.delete('/api/position/', controller.deleteAll)
  app.delete('/api/position/:id', controller.delete)
}
