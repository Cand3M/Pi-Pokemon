const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pokemon = sequelize.define('Pokemon', {
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ataque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  Pokemon.associate = (models) => {
    Pokemon.belongsToMany(models.Type, { through: 'PokemonType', foreignKey: 'PokemonID' });
  };

  Pokemon.createPokemon = async (pokemonData) => {
    try {
      return await Pokemon.create(pokemonData);
    } catch (error) {
      throw new Error('Error creating pokemon');
    }
  };  
  
  return Pokemon;
};

