const db = require('../models')
const Salle = db.salle
const Departement = db.departement
const Position = db.position
const Op = db.Sequelize.Op
const sql = db.sequelize
exports.create = async (req, res) => {
  try {
    if (!req.body.num) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Salle.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Salle: ${error}`)
  }
}

exports.findAll = async (req, res) => {
  const date = new Date()
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour12: false,
    timeStyle: 'medium',
  })

  const updatedData = await sql.query(
    `SELECT salles.id, salles.num, salles.etat, departements.nom FROM salles, departements WHERE salles.iddep=departements.id`
  )

  for (const row of updatedData[0]) {
    if (row.etat == 0) {
      const positionsofsalle = await sql.query(
        `SELECT * FROM positions WHERE idsalle = ${row.id}`
      )
      for (const row1 of positionsofsalle[0]) {
        //  console.log('date1',row1.date)
        //  console.log('date2',date)
        //  console.log('result' ,row1.date<=date)
        if (row1.etat == 0) {
          if (row1.date <= date) {
            if (row1.heure < currentTime) {
              Position.update(
                { id: row1.id, etat: 1 },
                {
                  where: { id: row1.id },
                }
              )
                .then(() => {
                  Salle.update(
                    { id: row.id, etat: 1 },
                    {
                      where: { id: row.id },
                    }
                  )
                })
                .then(() => {
                  console.log('susss')
                })
            }
          }
        }
      }
    }
  }
  const Data = await sql.query(
    `SELECT salles.id, salles.num, salles.etat, departements.nom FROM salles, departements WHERE salles.iddep=departements.id`
  )

  res.send(Data[0])
}

exports.findOne = async (req, res, next) => {
  const { id } = req.params
  try {
    const salle = await db.salle.findOne({
      attributes: ['id', 'num', 'etat'],
      include: [
        {
          model: db.departement,
          attributes: ['nom'],
        },
      ],
      where: { id: id },
    })
    if (!salle) {
      return res.status(404).json({ error: 'Salle not found' })
    }
    return res.status(200).json(salle)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

exports.update = (req, res) => {
  const id = req.params.id
  Salle.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Salle was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Salle with id=${id}. Maybe Salle was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Salle with id=' + id,
      })
    })
}
exports.modifier = (req, res) => {
  const id = req.params.id
  const x = req.params.x
  Salle.update(
    { id: id, etat: x },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Salle was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Salle with id=${id}. Maybe Salle was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Salle with id=' + id,
      })
    })
}
exports.delete = (req, res) => {
  const id = req.params.id
  Salle.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Salle was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Salle with id=${id}. Maybe Salle was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Salle with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Salle.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Salles were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Salle.',
      })
    })
}
