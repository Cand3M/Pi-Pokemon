const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PokemonType = sequelize.define('PokemonType', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  });

  return PokemonType;
};
