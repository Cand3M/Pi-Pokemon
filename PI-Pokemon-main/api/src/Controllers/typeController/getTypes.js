const { Type } = require('../../models/Type');

const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTypes,
};
