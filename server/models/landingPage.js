var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var landingPageSchema = new Schema ({
    logo: {data: Buffer, contentType: String},
    details: {type: String},
    primaryColor: {type: String},
    font: {type: String},
    businessID: {type: Number}
}, {_id: false});

module.exports = mongoose.model("Landing Page", landingPageSchema);