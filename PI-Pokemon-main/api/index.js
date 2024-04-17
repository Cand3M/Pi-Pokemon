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
const Pokemon = require('./src/models/Pokemon.js');
const Type = require('./src/models/Type.js');


import('node-fetch').then(fetchModule => {
  const fetch = fetchModule.default;
}).catch(error => {
  console.error('Error importing node-fetch:', error);
});

const { conn } = require('./src/db.js');

const app = require('./src/app.js');


conn.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});


app.get('/pokemons', async (req, res) => {
  try {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
   
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    
    console.error('Error fetching pokemons:', error);
    res.status(500).json({ error: 'Error fetching pokemons' });
  }
});

app.post('/pokemons', async (req, res) => {
  const { name, types } = req.body;
  try {
    
    const newPokemon = await Pokemon.create({ name });

    
    const foundTypes = await Promise.all(
      types.map(async typeName => {
        let type = await Type.findOne({ where: { name: typeName } });
        if (!type) {
          type = await Type.create({ name: typeName });
        }
        return type;
      })
    );

   
    await newPokemon.setTypes(foundTypes);

  
    res.status(201).json(newPokemon);
  } catch (error) {
   
    console.error('Error creating pokemon:', error);
    res.status(500).json({ error: 'Error creating pokemon' });
  }
});

