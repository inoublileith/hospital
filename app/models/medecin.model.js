module.exports = (sequelize, DataTypes) => {
  const Medecin = sequelize.define('medecins', {
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
  return Medecin
}
