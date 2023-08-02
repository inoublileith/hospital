const db = require('../models')
const Departement = db.departement
const Op = db.Sequelize.Op
const sql = db.sequelize
//function to create a departement 
exports.create = async (req, res) => {
  try {
    if (!req.body.nom) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Departement.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Departement: ${error}`)
  }
}
//function to find all the departments 
exports.findAll = async (req, res) => {
  const data = await sql
    .query(`SELECT * FROM departements  `)
    .then((data) => {
      console.log('data : ', data[0])
      res.send(data[0])
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving departements.',
      })
    })
}
//function to find one departements
exports.findOne = (req, res) => {
  const id = req.params.id
  Departement.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Departement with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Departement with id=' + id,
      })
    })
}
//function to update 
exports.update = (req, res) => {
  const id = req.params.id
  Departement.update(req.body, {
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Departement was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Departement with id=${id}. Maybe Departement was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Departement with id=' + id,
      })
    })
}
//function to delete 
exports.delete = (req, res) => {
  const id = req.params.id
  Departement.destroy({
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Departement was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Departement with id=${id}. Maybe Departement was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Departement with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Departement.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Departements were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Departement.',
      })
    })
}
