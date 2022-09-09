var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var businessSchema = new Schema({
    sector: {type: String},
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String},
    phoneNumber: {type: String},
});

module.exports = mongoose.model("Businesses", businessSchema);