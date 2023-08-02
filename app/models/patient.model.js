
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('patients', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
    },
    prenom: {
      type: DataTypes.STRING,
    },
    numero: {
      type: DataTypes.STRING,
    },
    matricule: {
      type: DataTypes.STRING,
    },
    etat: {
      type: DataTypes.INTEGER,
    },
  })
  return Patient
}
