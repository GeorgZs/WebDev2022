var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: true },
    phoneNumber: {type: String},
    name: {type: String, required: true },
}, {_id: false});


var bookingRequestSchema = new Schema({
    providerId: {type: String, required: true },
    message: {type: String},
    date: {type: String, default: Date.now()},
    timePeriod: {type: String, required: true },
    user: {type: userSchema, required: true },
    serviceId: {type: String, required: true }
});

module.exports = mongoose.model("BookingRequests", bookingRequestSchema);