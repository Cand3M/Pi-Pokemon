const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pokemon = require('../models/Pokemon');
const Type = require('../models/Type');

router.get('/pokemons', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemons = response.data.results.map(pokemon => ({
            name: pokemon.name,
            url: pokemon.url
        }));
        res.json(pokemons);
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pokemon/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params;
    try {
        // Lógica para obtener detalles de un solo pokemon desde la API
    } catch (error) {
        console.error('Error fetching pokemon details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pokemons/name', async (req, res) => {
    const { name } = req.query;
    try {
        // Lógica para buscar pokemons por nombre en la API
    } catch (error) {
        console.error('Error searching pokemons by name:', error);
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
        console.error('Error creating pokemon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
