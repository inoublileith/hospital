const db = require('../models')
const Operation = db.operation
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.nom) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Operation.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Operation: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { nom } = req.query
  let condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null
  Operation.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Operations.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Operation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Operation with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Operation with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Operation.update(req.body, {
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Operation was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Operation with id=${id}. Maybe Operation was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Operation with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Operation.destroy({
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Operation was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Operation with id=${id}. Maybe Operation was not found!`,
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
  Operation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Operations were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Operation.',
      })
    })
}
