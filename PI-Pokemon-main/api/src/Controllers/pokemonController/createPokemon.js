const { Pokemon, Type } = require('../models');

const createPokemon = async (req, res) => {
  const { name, types } = req.body;
  try {
    const pokemon = await Pokemon.create({ name });
    const foundTypes = await Type.findAll({ where: { name: types } });
    await pokemon.setTypes(foundTypes);
    res.status(201).json(pokemon);
  } catch (error) {
    console.error('Error creating pokemon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPokemon,
};
