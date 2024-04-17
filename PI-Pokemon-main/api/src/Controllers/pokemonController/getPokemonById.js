const { Pokemon } = require('../../models/Pokemon');

const getPokemonById = async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const pokemon = await Pokemon.findByPk(idPokemon);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    console.error('Error fetching pokemon by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getPokemonById,
};
