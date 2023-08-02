module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('staffes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
    },
  })
  //
  //fs
  //
  return Staff
}
