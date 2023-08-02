const db = require('../models')
const Patient = db.patient
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.nom) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Patient.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Patient: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { nom } = req.query
  let condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null
  Patient.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Patients.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Patient.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Patient with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Patient with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Patient.update(req.body, {
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Patient was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Patient with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Patient.destroy({
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Patient was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Patient with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Patient.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Patients were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Patient.',
      })
    })
}
