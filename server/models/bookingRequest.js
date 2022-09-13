var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String},
    phoneNumber: {type: String},
    name: {type: String},
}, {_id: false});


var bookingRequestSchema = new Schema({
    businessId: {type: String},
    message: {type: String},
    date: {type: String, default: Date.now()},
    timePeriod: {type: String},
    user: {type: userSchema},
    serviceID: {type: String}
});

module.exports = mongoose.model("BookingRequests", bookingRequestSchema);