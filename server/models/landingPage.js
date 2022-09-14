const mongoose = require('mongoose');

const landingPageSchema = new mongoose.Schema({
    providerId: { type: String, required: true },
    logo: { type: String },
    primaryColor: { type: String },
    content: { type: String },
}, { _id: false });

module.exports = mongoose.model("landingpages", landingPageSchema);
