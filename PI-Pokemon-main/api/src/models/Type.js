const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Type = sequelize.define('Type', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Type.associate = (models) => {
    Type.belongsToMany(models.Pokemon, { through: 'PokemonType' });
  };

  return Type;
};