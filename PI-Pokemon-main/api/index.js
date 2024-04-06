//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express');
import('node-fetch').then(fetchModule => {
  const fetch = fetchModule.default;
  // Aquí puedes usar fetch para realizar las solicitudes HTTP
}).catch(error => {
  console.error('Error importing node-fetch:', error);
});

const { conn } = require('./src/db.js');

// Importa el servidor de la aplicación desde el archivo correspondiente
const app = require('./src/app.js');

// Sincroniza todos los modelos de la base de datos
conn.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});

// Manejo de la ruta para obtener los pokemons
app.get('/pokemons', async (req, res) => {
  try {
    // Realiza la solicitud a la API de PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    // Parsea la respuesta como JSON
    const data = await response.json();
    // Envía los datos de los pokemons como respuesta
    res.json(data);
  } catch (error) {
    // Maneja los errores
    console.error('Error fetching pokemons:', error);
    res.status(500).json({ error: 'Error fetching pokemons' });
  }
});
