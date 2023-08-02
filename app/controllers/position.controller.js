const db = require('../models')
const Position = db.position
const Patient = db.patient
const Operation = db.operation
const Medecin = db.medecin
const User = db.user
const Staff = db.staff
const Infermiers = db.infermier
const Op = db.Sequelize.Op
const sql = db.sequelize
exports.create = async (req, res) => {
   try {
     if (!req.body.date) {
       res.status(400).send({
         message: 'Content can not be empty!',
       })
       return
     }
     const position = await Position.create(req.body)
     res.send(position)
   } catch (error) {
     console.log(error)
     return res.send(`Error when trying to create Position: ${error}`)
   }
}

exports.findAll = async (req, res) => {
  const data = await sql
    .query(
      `SELECT positions.id , positions.date , positions.heure , positions.etat  , positions.idsalle , patients.matricule ,operations.nom as opnom ,staffes.nom as staff ,infermiers.nom as infermier,medecins.nom as medecin 
      FROM positions,patients,operations,staffes,infermiers,medecins
      WHERE 
      positions.idpatient = patients.id 
      and positions.idope = operations.id
      and positions.idstaff  = staffes.id
      and positions.idinfermier  = infermiers.id
      and positions.idmedecin  = medecins.id
      `
    )
    .then((data) => {
      console.log('data : ', data[0])
      res.send(data[0])
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving positions.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Position.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Position with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Position with id=' + id,
      })
    })
}

exports.find = (req, res) => {
  const id = req.params.id // Assuming the id is passed as a parameter in the request

  const data = sql
    .query(
      `SELECT positions.id, positions.date, positions.heure, positions.etat, positions.idsalle, patients.matricule, operations.nom as opnom, staffes.nom as staff, infermiers.nom as infermier, medecins.nom as medecin
      FROM positions
      JOIN staffes ON positions.idstaff = staffes.id
      JOIN infermiers ON positions.idinfermier = infermiers.id
      JOIN medecins ON positions.idmedecin = medecins.id
      JOIN patients ON positions.idpatient = patients.id
      JOIN operations ON positions.idope = operations.id
      WHERE (staffes.iduser = ${id} OR infermiers.iduser = ${id} OR medecins.iduser = ${id})`
    )
    .then((data) => {
      console.log('data: ', data[0])
      res.send(data[0])
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving positions.',
      })
    })
}



exports.findByEtat = (req, res) => {
  const id = req.params.id // Assuming the id is passed as a parameter in the request

  Position.findAll({
    attributes: ['id', 'date', 'heure', 'etat', 'idsalle'],
    include: [
      { model: Staff, attributes: ['nom'] },
      { model: Infermiers, attributes: ['nom'] },
      { model: Medecin, attributes: ['nom'] },
      { model: Patient, attributes: ['matricule'] },
      { model: Operation, attributes: ['nom'] },
    ],
    where: {
      idsalle: id,
      etat: 0,
    },
  })
    .then((positions) => {
      if (positions.length === 0) {
        return res.status(404).send({
          message: 'No positions found with the given id and state.',
        })
      }
      console.log('positions:', positions)
      res.send(positions)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving positions.',
      })
    })
}
exports.findByDate = (req, res) => {
  const id = req.params.id // Assuming the id is passed as a parameter in the request

  const currentDate = new Date().toISOString().split('T')[0] // Get the current date in 'YYYY-MM-DD' format

  const data = sql
    .query(
      `SELECT positions.id, positions.date, positions.heure, positions.etat, positions.idsalle, patients.matricule, operations.nom as opnom, staffes.nom as staff, infermiers.nom as infermier, medecins.nom as medecin
      FROM positions
      JOIN staffes ON positions.idstaff = staffes.id
      JOIN infermiers ON positions.idinfermier = infermiers.id
      JOIN medecins ON positions.idmedecin = medecins.id
      JOIN patients ON positions.idpatient = patients.id
      JOIN operations ON positions.idope = operations.id
      WHERE (staffes.iduser = ${id} OR infermiers.iduser = ${id} OR medecins.iduser = ${id})
      AND positions.date = '${currentDate}'`
    )
    .then((data) => {
      console.log('data: ', data[0])
      res.send(data[0])
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving positions.',
      })
    })
}


exports.update = (req, res) => {
  const id = req.params.id
  Position.update(req.body, {
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Position was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Position with id=${id}. Maybe Position was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Position with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Position.destroy({
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Position was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Position with id=${id}. Maybe Position was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Position with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Position.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Positions were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Position.',
      })
    })
}
