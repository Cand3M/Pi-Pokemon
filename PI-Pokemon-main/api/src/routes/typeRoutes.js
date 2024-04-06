const express = require('express');
const router = express.Router();

const Type = require('../models/Type');

router.get('/type', async (req, res) => {
    try {
      let types = await Type.findAll();
      if (types.length === 0) {
        // Si no hay tipos en la base de datos, obtenerlos de la API
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        types = response.data.results.map(result => ({ name: result.name }));
        // Guardar los tipos en la base de datos
        await Type.bulkCreate(types);
      }
      res.json(types);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;