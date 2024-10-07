const mongoose = require('mongoose');

//schema used to pull data from nba teams
const TeamSchema = mongoose.Schema({})

module.exports = mongoose.model('Team', TeamSchema, 'NBA_teams');