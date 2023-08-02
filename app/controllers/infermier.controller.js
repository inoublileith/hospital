const db = require('../models')
const Infermier = db.infermier
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.nom) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Infermier.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Infermier: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { nom } = req.query
  let condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null
  Infermier.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Infermiers.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Infermier.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Infermier with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Infermier with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Infermier.update(req.body, {
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Infermier was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Infermier with id=${id}. Maybe Infermier was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Infermier with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Infermier.destroy({
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Infermier was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Infermier with id=${id}. Maybe Infermier was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Infermier with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Infermier.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Infermiers were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Infermier.',
      })
    })
}
