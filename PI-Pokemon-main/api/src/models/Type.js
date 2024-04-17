const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Type = sequelize.define('Type', {
    ID: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Type.associate = (models) => {
    Type.belongsToMany(models.Pokemon, { through: 'PokemonType', foreignKey: 'TypeID' });
  };  

  return Type;
};