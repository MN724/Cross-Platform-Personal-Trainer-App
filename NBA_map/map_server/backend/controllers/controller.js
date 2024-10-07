const asyncHandler = require('express-async-handler');

const City = require('../models/cityModel');
const Team = require('../models/teamModel');
const { default: mongoose } = require('mongoose');

//get coords for a city
const getCities = asyncHandler( async (req, res) => {
    const query = req.query.query;
    const queryArr = query.split(", ")
    if (queryArr[0][queryArr[0].length - 1] == ',') {
        console.log(queryArr[0][queryArr[0].length - 1])
        queryArr[0] = queryArr[0].substring(0, queryArr[0].length - 1);
        console.log(queryArr[0][queryArr[0].length - 1])
    }
    if (queryArr[1] === undefined) {
        queryArr[1] = ''
    }
    console.log('query = ' + query)
    console.log('queryArr[0] = ' + queryArr[0])
    console.log('queryArr[1] = ' + queryArr[1])
    try {
        //limits search results
        // const searchResults = await City.find({ City: { $regex: query, $options: 'i'} });
        const searchResults = await City.find({ CITY: { $regex: '^' + queryArr[0], $options: 'i'}, STATE_CODE: { $regex: '^' + queryArr[1], $options: 'i'} }).limit(5);
        // console.log('searchResults2 = ' + searchResults)

        res.json(searchResults);
        // console.log('json searchResults2 = ' + searchResults)

    } catch (error) {
        console.error('Error searching in MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
    

//get coords for NBA team
const getNBATeams = asyncHandler( async (req, res) => {
    //grab all team coords
    const teamCoords = await Team.find({});
    
    res.status(200).json(teamCoords);
});

//specific team
const getNBATeam = asyncHandler( async (req, res) => {
    //single team id
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such city"})
    }

    //checking request text
    const teamCoords = await Team.findbyID(id);

    if(!teamCoords) {
        return res.status(404).json({error: "No such city"})
    }

    res.status(200).json(teamCoords);
});

module.exports = {
    getCities,
    getNBATeams,
    getNBATeam
}