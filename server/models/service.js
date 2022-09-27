const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    providerId: {type: String, required: true},
    duration: {type: Number},
    details: {type: String},
    address: {type: String}
});

module.exports = mongoose.model("services", serviceSchema); 
