const express = require('express');
const{
    getCities,
    getNBATeams,
    getNBATeam,
} = require('../controllers/controller')
const router = express.Router();


//CRUD functionality

//NBA Team GET requests
router.get('/', getNBATeams)

//City get requests
router.get('/search', getCities);

module.exports = router