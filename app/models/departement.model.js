module.exports = (sequelize, DataTypes) => {
  const Departement = sequelize.define('departements', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    matricule: {
      type: DataTypes.INTEGER,
    },
    nom: {
      type: DataTypes.STRING,
    },
    etat: {
      type: DataTypes.INTEGER,
    },
  })
  return Departement
}
