const controller = require('../controllers/departement.controller')

module.exports = function (app) {
  app.get('/api/departement/:id', controller.findOne)
  app.get('/api/departement/', controller.findAll)
  app.post('/api/departement/', controller.create)
  app.put('/api/departement/:id', controller.update)
  app.delete('/api/departement/', controller.deleteAll)
  app.delete('/api/departement/:id', controller.delete)
}
