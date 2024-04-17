const { Pokemon } = require('../../models/Pokemon');

const getPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getPokemons,
};
