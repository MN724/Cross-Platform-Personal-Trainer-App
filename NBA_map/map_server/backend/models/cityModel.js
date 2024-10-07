const mongoose = require('mongoose');

//schema used to pull data from Cities
const CitySchema = mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    STATE_CODE: {
        type: String,
        required: true
    },
    STATE_NAME: {
        type: String,
        required: true
    },
    CITY: {
        type: String,
        required: true
    },
    COUNTY: {
        type: String,
        required: true
    },
    LATITUDE: {
        type: Number,
        required: true
    },
    LONGITUDE: {
        type: Number,
        required: true
    }
    // City: {
    //     type: String,
    //     required: true
    // },
    // longitude:{
    //     type: Number,
    //     required: true
    // },
    // latitude:{
    //     type:Number,
    //     required: true
    // }
});

// module.exports = mongoose.model('City', CitySchema, 'USCities');
module.exports = mongoose.model('City', CitySchema, 'More_USCities');