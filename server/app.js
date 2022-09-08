var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
var Schema = mongoose.Schema;

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

var userSchema = new Schema({
    email: {type: String},
    phoneNumber: {type: String},
    name: {type: String},
}, {_id: false})

var serviceSchema = new Schema ({
    _id: {type: Number},
    duration: {type: String},
    details: {type: String},
    name: {type: String},
    price: {type: Number}

}); 

var bookingRequestSchema = new Schema({
    _id: {type: Number},
    message: {type: String},
    date: {type: String, default: Date.now()},
    timePeriod: {type: String},
    user: {type: userSchema},
    serviceID: {type: Number}
});

var landingPageSchema = new Schema ({
    logo: {data: Buffer, contentType: String},
    details: {type: String},
    primaryColor: {type: String},
    font: {type: String},
    businessID: {type: Number}
})

var businessSchema = new Schema({
    _id: {type: Number},
    sector: {type: String},
    name: {type: String},
    email: {type: String, required: true},
    address: {type: String},
    phoneNumber: {type: String},
    services: {type: [ serviceSchema ]},
    landingPage: {type: landingPageSchema},
    bookingRequests: {type: [ bookingRequestSchema ]}
});

var Service = mongoose.model("Services", serviceSchema);

var BookingRequest = mongoose.model("Booking Requests", bookingRequestSchema);

var LandingPage = mongoose.model("Landing Page", landingPageSchema);

var Business = mongoose.model("Businesses", businessSchema);




// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
