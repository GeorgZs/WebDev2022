var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema ({
    duration: {type: String},
    details: {type: String},
    name: {type: String},
    price: {type: Number},
    businessId: {type: String}
}); 

module.exports = mongoose.model("Services", serviceSchema);