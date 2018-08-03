const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user')

const StarSchema = new Schema({
  starname: { type: String, required: true },
  word:{type: String, required: true},
  username:{type: String, required: true}
  
});

module.exports = mongoose.model('Star', StarSchema);