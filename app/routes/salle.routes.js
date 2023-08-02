const controller = require('../controllers/salle.controller')

module.exports = function (app) {
  app.get('/api/salle/:id', controller.findOne)
  app.get('/api/salle/', controller.findAll)
  app.post('/api/salle/', controller.create)
  app.put('/api/salle/:id', controller.update)
  app.delete('/api/salle/', controller.deleteAll)
  app.delete('/api/salle/:id', controller.delete)
  app.put('/api/salle/:id/:x', controller.modifier)
}
