const { authJwt } = require('../middleware')
const controller = require('../controllers/utilisateur.controller')
module.exports = function (app) {


  app.get('/api/namespace/public', controller.allAccess)
  app.get('/api/namespace/users', controller.findAll)
  app.post('/api/namespace/users/:id', controller.UpdateById)
  app.delete('/api/namespace/users/:id', controller.delete)
  app.delete('/api/namespace/users', controller.delete)
  app.get('/api/namespace/user', [authJwt.verifyToken], controller.userBoard)

  app.get(
    '/api/namespace/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  )

  app.get(
    '/api/namespace/analyste',
    [authJwt.verifyToken, authJwt.isAnalyste],
    controller.analysteBoard
  )
  app.get(
    '/api/namespace/prestataire',
    [authJwt.verifyToken, authJwt.isPrestataire],
    controller.prestataireBoard
  )
  app.get(
    '/api/namespace/consomateur',
    [authJwt.verifyToken, authJwt.isConsomateur],
    controller.consomateurBoard
  )
}
