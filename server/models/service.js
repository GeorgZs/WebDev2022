var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema ({
    _id: {type: Number},
    duration: {type: String},
    details: {type: String},
    name: {type: String},
    price: {type: Number}
}); 

module.exports = mongoose.model("Services", serviceSchema);