const Pokemon = require('../../models/Pokemon');
const Type = require('../../models/Type');

const createPokemonController = async (req, res) => {
  const { name, types } = req.body;
  try {
    console.log("Creating new Pokemon:", name);
    const pokemon = await Pokemon.createPokemon({ name });
    console.log("Pokemon created:", pokemon);
    const foundTypes = await Type.findAll({ where: { name: types } });
    console.log("Found types:", foundTypes);
    await pokemon.setTypes(foundTypes);
    console.log("Types associated with Pokemon");
    res.status(201).json(pokemon);
  } catch (error) {
    console.error('Error creating pokemon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPokemonController,
};
