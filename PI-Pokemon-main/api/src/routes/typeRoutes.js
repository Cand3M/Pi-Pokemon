const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getTypes } = require('../Controllers/typeController/getTypes');
const Type = require('../models/Type');

router.get('/type', getTypes); 

module.exports = router;
