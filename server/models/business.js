var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var landingPageSchema = require('./landingPage').schema;
var bookingRequestSchema = require('./bookingRequest').schema;
var serviceSchema = require('./service').schema;


var businessSchema = new Schema({
    _id: {type: Number},
    sector: {type: String},
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String},
    phoneNumber: {type: String},
    services: {type: [ serviceSchema ]},
    landingPage: {type: landingPageSchema},
    bookingRequests: {type: [ bookingRequestSchema ]}
});

module.exports = mongoose.model("Businesses", businessSchema);