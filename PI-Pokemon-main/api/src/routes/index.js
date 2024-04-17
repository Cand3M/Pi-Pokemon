const { Router } = require('express');
// Importar todos los routers;
const pokemonRouter = require('./pokemonRoutes');
const typeRouter = require('./typeRoutes');

const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonRouter);
router.use('/types', typeRouter);


module.exports = router;
