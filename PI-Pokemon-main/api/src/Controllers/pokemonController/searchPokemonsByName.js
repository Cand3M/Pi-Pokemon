const { Pokemon } = require('../models');

const searchPokemonsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const pokemons = await Pokemon.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`, // Case-insensitive search
        },
      },
    });
    if (pokemons.length === 0) {
      return res.status(404).json({ error: 'No matching Pokemon found' });
    }
    res.json(pokemons);
  } catch (error) {
    console.error('Error searching pokemons by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  searchPokemonsByName,
};
