const mongoose = require('mongoose');

const landingPageSchema = new mongoose.Schema({
    providerId: { type: String, required: true },
    logo: { type: String },
    primaryColor: { type: String },
    content: { type: String },
});

module.exports = mongoose.model("landingpages", landingPageSchema);
