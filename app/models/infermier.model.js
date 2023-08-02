module.exports = (sequelize, DataTypes) => {
  const Infermier = sequelize.define('infermiers', {
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
  return Infermier
}
