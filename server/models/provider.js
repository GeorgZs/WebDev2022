const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    sector: { type: String, required: true },
    phoneNumber: { type: String },
    token: {type: String}
    //logoPicture: { type: String }, url path to images folder 
});

module.exports = mongoose.model("providers", providerSchema);
