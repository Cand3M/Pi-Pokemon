const express = require('express');
const router = express.Router();

router.get('/pokemons', async (req, res) => {
    try {
      const pokemons = await Pokemon.findAll({
        include: [Type]
      });
      res.json(pokemons);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/pokemons/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params;
    try {
      const pokemon = await Pokemon.findByPk(idPokemon, {
        include: [Type]
      });
      if (!pokemon) {
        return res.status(404).json({ error: 'Pokemon not found' });
      }
      res.json(pokemon);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/pokemons/name', async (req, res) => {
    const { name } = req.query;
    try {
      const pokemons = await Pokemon.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${name}%` // Case-insensitive search
          }
        },
        include: [Type]
      });
      if (pokemons.length === 0) {
        return res.status(404).json({ error: 'No matching Pokemon found' });
      }
      res.json(pokemons);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/pokemons', async (req, res) => {
    const { name, types } = req.body;
    try {
      // Crea el Pokémon
      const pokemon = await Pokemon.create({ name });
      // Busca los tipos en la base de datos, o los crea si no existen
      const foundTypes = await Promise.all(
        types.map(async typeName => {
          let type = await Type.findOne({ where: { name: typeName } });
          if (!type) {
            type = await Type.create({ name: typeName });
          }
          return type;
        })
      );
      // Asocia los tipos al Pokémon
      await pokemon.setTypes(foundTypes);
      res.status(201).json(pokemon);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;