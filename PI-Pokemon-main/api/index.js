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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});


const express = require('express');
// Define una función async wrapper para utilizar await
const fetchData = async () => {
  let fetch;
  try {
    const fetchModule = await import('node-fetch');
    fetch = fetchModule.default;
  } catch (error) {
    console.error('Error importing node-fetch:', error);
  }

  // Si no hay ningún error al importar el módulo, `fetch` estará disponible para su uso.
  return fetch;
};

// Llama a la función fetchData y maneja cualquier error
fetchData().then(fetch => {
  // Tu lógica aquí
}).catch(error => {
  console.error('Error fetching data:', error);
});


const app = express();

app.use(express.json());

app.get('/pokemons', async (req, res) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Error fetching pokemons' });
  }
});

module.exports = app;
