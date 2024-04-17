const express = require('express');
const router = express.Router();
const axios = require('axios');
const { createPokemonController } = require('../Controllers/pokemonController/createPokemon');
const { getPokemons } = require('../Controllers/pokemonController/getPokemons'); 
const { searchPokemonsByName } = require('../controllers/pokemonController/searchPokemonsByName'); 
const { getPokemonById } = require('../Controllers/pokemonController/getPokemonById');

const Pokemon = require('../models/Pokemon');
const Type = require('../models/Type');

router.get('/pokemons', getPokemons); 

router.get('/pokemon/:idPokemon', getPokemonById);

router.get('/pokemons/name', searchPokemonsByName); 

router.post('/pokemons', createPokemonController); 

module.exports = router;
