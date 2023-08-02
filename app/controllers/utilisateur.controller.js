const db = require('../models')

const User = db.user
const Role = db.role
const RefreshToken = db.refreshToken
//const { user: User, role: Role, refreshToken: RefreshToken } = db
const Op = db.Sequelize.Op
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const getPagination = (page, size) => {
  const limit = size ? +size : 100
  const offset = page ? page * limit : 0
  return { limit, offset }
}
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)
  return { totalItems, users, totalPages, currentPage }
}
exports.findAll = (req, res) => {
  const [results] = await sequelize.query(
  "SELECT * FROM kines JOIN Users ON kines.userid = users.id"
);
console.log(JSON.stringify(results, null, 2));
res.send(results)
}
exports.findAllPromoted = (req, res) => {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  User.findAll({ where: { promoted: 1 }, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}
exports.UpdateById = (req, res) => {
  const id = req.params.id
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      })
    })
}
exports.delete = (req, res) => {
  const id = req.params.id
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete USer with id=${id}. Maybe User was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      })
    })
}
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Users.',
      })
    })
}

exports.allAccess = (req, res) => {
  res.status(200).send('Welcome to SRTJ ')
}
exports.userBoard = (req, res) => {
  res.status(200).send('User Content.')
}
exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}
exports.analysteBoard = (req, res) => {
  res.status(200).send('Analyste Content.')
}
exports.prestataireBoard = (req, res) => {
  res.status(200).send('Prestataire Content.')
}
exports.consomateurBoard = (req, res) => {
  res.status(200).send('Consomateur Content.')
}
