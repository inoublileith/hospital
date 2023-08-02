const controller = require('../controllers/medecin.controller')

module.exports = function (app) {
  app.get('/api/medecin/count', controller.getCount)
  app.get('/api/medecin/medecin', controller.getCountMedecin)
  app.get('/api/medecin/staff', controller.getCountStaff)
  app.get('/api/medecin/infermier', controller.getCountInfermier)
  app.get('/api/medecin/operation', controller.getCountOperation)
  app.get('/api/medecin/year', controller.getRecentRecords)
  app.get('/api/medecin/month', controller.getRecentMonth)
  app.get('/api/medecin/date', controller.getRecentDate)
  app.get('/api/medecin/:id', controller.findOne)
  app.get('/api/medecin/', controller.findAll)
  app.post('/api/medecin/', controller.create)
  app.put('/api/medecin/:id', controller.update)
  app.delete('/api/medecin/', controller.deleteAll)
  app.delete('/api/medecin/:id', controller.delete)
}
