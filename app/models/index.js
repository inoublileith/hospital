const config = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./user.model.js')(sequelize, Sequelize)
db.role = require('../models/role.model.js')(sequelize, Sequelize)

db.salle = require('./salle.model.js')(sequelize, Sequelize)
db.position = require('./position.model.js')(sequelize, Sequelize)
db.medecin = require('./medecin.model.js')(sequelize, Sequelize)
db.staff = require('./staff.model.js')(sequelize, Sequelize)
db.infermier = require('./infermier.model.js')(sequelize, Sequelize)
db.operation = require('./operation.model.js')(sequelize, Sequelize)
db.departement = require('./departement.model.js')(sequelize, Sequelize)
db.patient = require('./patient.model.js')(sequelize, Sequelize)
db.refreshToken = require('../models/refreshToken.model.js')(
  sequelize,
  Sequelize
)

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})


db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})


db.salle.hasMany(db.position, {
as: 'Position',
foreignKey: 'idsalle'
})
db.position.belongsTo(db.salle, { foreignKey: 'idsalle' })

db.user.hasMany(db.medecin, {
  as: 'medecin',
  foreignKey: 'iduser',
})
db.medecin.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.infermier, {
  as: 'infermier',
  foreignKey: 'iduser',
})
db.infermier.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.staff, {
  as: 'staff',
  foreignKey: 'iduser',
})
db.staff.belongsTo(db.user, { foreignKey: 'iduser' })

db.staff.hasMany(db.position, {
  as: 'position',
  foreignKey: 'idstaff',
})
db.position.belongsTo(db.staff, { foreignKey: 'idstaff' })

db.infermier.hasMany(db.position, {
  as: 'position',
  foreignKey: 'idinfermier',
})
db.position.belongsTo(db.infermier, { foreignKey: 'idinfermier' })

db.medecin.hasMany(db.position, {
  as: 'position',
  foreignKey: 'idmedecin',
})
db.position.belongsTo(db.medecin, { foreignKey: 'idmedecin' })

db.patient.hasMany(db.position, {
  as: 'position',
  foreignKey: 'idpatient',
})
db.position.belongsTo(db.patient, { foreignKey: 'idpatient' })

db.departement.hasMany(db.salle, {
  as: 'position',
  foreignKey: 'iddep',
})
db.salle.belongsTo(db.departement, { foreignKey: 'iddep' })


db.operation.hasMany(db.position, {
  as: 'position',
  foreignKey: 'idope',
})
db.position.belongsTo(db.operation, { foreignKey: 'idope' })
module.exports = db

/*
After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of them:

create a new User: create(object)
find a User by id: findByPk(id)
find a User by email: findOne({ where: { email: ... } })
get all Users: findAll()
find all Users by username: findAll({ where: { username: ... } })
*/

