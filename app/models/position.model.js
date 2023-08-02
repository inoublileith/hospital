module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('positions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    heure: {
      type: DataTypes.TIME,
    },

    etat: {
      type: DataTypes.INTEGER,
    },
  })
  
  return Position
}
