var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String},
    phoneNumber: {type: String},
    name: {type: String},
}, {_id: false});


var bookingRequestSchema = new Schema({
    _id: {type: Number},
    message: {type: String},
    date: {type: String, default: Date.now()},
    timePeriod: {type: String},
    user: {type: userSchema},
    serviceID: {type: Number}
});

module.exports = mongoose.model("Booking Requests", bookingRequestSchema);