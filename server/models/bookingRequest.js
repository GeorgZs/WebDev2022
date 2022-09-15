var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
}, { _id: false });


var bookingRequestSchema = new Schema({
    providerId: { type: String, required: true },
    serviceId: { type: String, required: true },
    timePeriod: { type: String, required: true },
    user: { type: userSchema, required: true },
    date: { type: String, default: Date.now() },
    message: { type: String }
});

module.exports = mongoose.model("BookingRequests", bookingRequestSchema);
