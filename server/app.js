const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const fs = require("fs").promises;
fs.access(__dirname).catch(err => console.log("FS access denied", err));

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://FuerduCorp:Furdu123@cluster0.cybyu71.mongodb.net/FurduDB?retryWrites=true&w=majority';
const port = process.env.PORT || 3000;

connectToDatabase(mongoURI);
const app = startApp(port);
module.exports = app;



function connectToDatabase(mongoURI) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
            console.error(err.stack);
            process.exit(1);
        }
        console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    });
}

function startApp(port) {
    const app = setupApp();
    addRoutesToApp(app);
    addFrontendToApp(app);

    // Error handler (i.e., when exception is thrown) must be registered last
    const env = app.get('env');
    addErrorHandlerToApp(app, env);

    app.listen(port, function (err) {
        if (err) throw err;
        console.log(`Express server listening on port ${port}, in ${env} mode`);
        console.log(`Backend: http://localhost:${port}/api/`);
        console.log(`Frontend (production): http://localhost:${port}/`);
    });

    return app;
}

function setupApp() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.options('*', cors());
    app.use(cors());
    return app;
}

function addRoutesToApp(app) {
    app.get('/api', function (req, res) {
        res.json({ 'message': 'Welcome to your DIT342 backend ExpressJS project!' });
    });

    const providerController = require('./controllers/provider');
    const serviceController = require('./controllers/service')
    const landingPageController = require('./controllers/landingPage');
    const bookingRequestController = require('./controllers/bookingRequest');
    app.use('/api/v1/providers', providerController);
    app.use('/api/v1', serviceController);
    app.use('/api/v1/providers/:providerId/landingPages', landingPageController);
    app.use('/api/v1', bookingRequestController);

    // Catch all non-error handler for api (i.e., 404 Not Found)
    app.use('/api/*', function (req, res) {
        res.status(404).json({ 'message': 'Endpoint Not Found' });
    });
}

function addFrontendToApp(app) {
    // Configuration for serving frontend in production mode
    // Support Vuejs HTML 5 history mode
    app.use(history());
    // Serve static assets
    const root = path.normalize(__dirname + '/..');
    const client = path.join(root, 'client', 'dist');
    app.use('/landingPagePictures', express.static(__dirname + '/landingPagePictures'))
    app.use(express.static(client));
}

function addErrorHandlerToApp(app, env) {
    // eslint-disable-next-line no-unused-consts
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        const err_res = {
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
}
