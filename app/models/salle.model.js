module.exports = (sequelize, DataTypes) => {
  const Salle = sequelize.define('salles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    num: {
      type: DataTypes.STRING,
    },

    etat: {
      type: DataTypes.INTEGER,
    },
  })

  return Salle
}
