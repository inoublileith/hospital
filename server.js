const express = require('express')
const cors = require('cors')
const app = express()
var corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// simple route

const db = require('./app/models')
const Role = db.role
// db.sequelize.sync().then(() => {
//   console.log('Resync Db ...')
//   initial()
// })
//  db.sequelize.sync({ force: true }).then(() => {
//    console.log('Drop and Resync Db')
//    initial()
//  })
function initial() {
  Role.create({
    id: 1,
    name: 'admin',
  })

  Role.create({
    id: 2,
    name: 'infermier',
  })

  Role.create({
    id: 3,
    name: 'medecin',
  })

  Role.create({
    id: 4,
    name: 'staf',
  })

  Role.create({
    id: 5,
    name: 'user',
  })
}

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to INFOESPRIT WORLD.' })
})



const authRouter = require('./app/routes/auth.routes')
authRouter(app)



const operationRouter = require('./app/routes/operation.routes')
operationRouter(app)
const patientRouter = require('./app/routes/patient.routes')
patientRouter(app)
const departementRouter = require('./app/routes/departement.routes')
departementRouter(app)
const infermierRouter = require('./app/routes/infermier.routes')
infermierRouter(app)
const medecinRouter = require('./app/routes/medecin.routes')
medecinRouter(app)
const staffRouter = require('./app/routes/staff.routes')
staffRouter(app)
const positionRouter = require('./app/routes/position.routes')
positionRouter(app)
const salleRouter = require('./app/routes/salle.routes')
salleRouter(app)
const userRouter = require('./app/routes/user.routes')
userRouter(app)
// set port, listen for requests
const PORT = process.env.PORT || 8088
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`)
//   initial()
})
