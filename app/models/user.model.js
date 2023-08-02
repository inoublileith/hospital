module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
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
    tel: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    adresse: {
      type: DataTypes.STRING,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: 4,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    profil: {
      type: DataTypes.INTEGER,
    },
    permissions: {
      type: DataTypes.INTEGER,
    },
    etat: {
      type: DataTypes.INTEGER,
    },
    date_ins: {
      type: DataTypes.STRING,
    },
  })
  //
  //fs
  //
  return User
}
