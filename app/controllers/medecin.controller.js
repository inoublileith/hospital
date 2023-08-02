const db = require('../models')
const Medecin = db.medecin
const Infermier = db.infermier
const Staff = db.staff
const Opertaion = db.operation
const Op = db.Sequelize.Op
//function calcul tous les sttafes 
exports.getCount = async (req, res) => {
  try {
    const count1 = await db.medecin.count()
    const count2 = await db.infermier.count()
    const count3 = await db.staff.count()

    const totalCount = count1 + count2 + count3
    console.log(totalCount)
    res.send(` ${totalCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
// fonction pour calculer les medecin
exports.getCountMedecin = async (req, res) => {
  try {
    const count1 = await db.medecin.count()

    const totalCount = count1
    console.log(totalCount)
    res.send(` ${totalCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
//calcul staffe
exports.getCountStaff = async (req, res) => {
  try {
    const count1 = await db.staff.count()

    const totalCount = count1
    console.log(totalCount)
    res.send(` ${totalCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
//calcul infermier
exports.getCountInfermier = async (req, res) => {
  try {
    const count1 = await db.infermier.count()

    const totalCount = count1
    console.log(totalCount)
    res.send(` ${totalCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
//calcul les operations
exports.getCountOperation = async (req, res) => {
  try {
    const count1 = await db.position.count()

    const totalCount = count1
    console.log(totalCount)
    res.send(` ${totalCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
//last year 
exports.getRecentRecords = async (req, res) => {
  try {
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - 1) // subtract one year from the current date

    const recordCount = await db.position.count({
      where: {
        date: {
          [Op.between]: [startDate, new Date()], // find records where the date is between `startDate` and the current date
        },
      },
    })
    console.log('year', recordCount)
    res.send(` ${recordCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
//last month 
exports.getRecentMonth = async (req, res) => {
  try {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 1) // subtract one month from the current date

    const recordCount = await db.position.count({
      where: {
        date: {
          [Op.between]: [startDate, new Date()], // find records where the date is between `startDate` and the current date
        },
      },
    })
    console.log('month', recordCount)
    res.send(` ${recordCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
//last day 
exports.getRecentDate = async (req, res) => {
  try {
    const currentDate = new Date()
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    )

    const recordCount = await db.position.count({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    })
    console.log('date', recordCount)
    res.send(` ${recordCount}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}

exports.create = async (req, res) => {
  try {
    if (!req.body.nom) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Medecin.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Medecin: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { nom } = req.query
  let condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null
  Medecin.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Medecins.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Medecin.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Medecin with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Medecin with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Medecin.update(req.body, {
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Medecin was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Medecin with id=${id}. Maybe Medecin was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Medecin with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Medecin.destroy({
    where: { id: id },
  })
    .then((date) => {
      if (date == 1) {
        res.send({
          message: 'Medecin was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Medecin with id=${id}. Maybe Medecin was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Medecin with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Medecin.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Medecins were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Medecin.',
      })
    })
}
