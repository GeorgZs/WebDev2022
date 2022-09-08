var express = require('express');
var router = express.Router();

var Business = require('../models/business');

router.post('/businesses', (req, res, next) => {
    var new_business = new Business(req.body);
    new_business.save((err) => {
        if(err){return next(err);}
        res.status(201).json(new_business);
    });
});

router.get('/businesses', (req, res, next) => {
    Business.find((err, businesses) => {
        if(err){return next(err);}
        res.json({"businesses": businesses});
    });
}); 

router.delete('/businesses', (req, res, next) => {
    Business.deleteMany((err, businesses) => {
        if(err){return next(err);}
        res.json({"businesses": businesses});
    });
});

router.get('/businesses/:id', (req, res, next) => { 
    Business.findById(req.params.id, (err, business) => {
        if(err){return next(err);}
        if(business == null){
            return res.status(404).json({"message": "Business not found"});
        }
        res.json(business);
    });
}); 

router.delete('/businesses/:id', (req, res, next) => {
    Business.findOneAndDelete(req.params.id, (err, business) => {
        if(err){return next(err);}
        if(business == null){
            return res.status(404).json({"message": "Business not found"});
        }
        res.json(business);
    });
});

router.put('/businesses/:id', (req, res, next) => {
    Business.findById(req.params.id, (err, business) => {
        if(err){return next(err);}
        if(business == null){
            return res.status(404).json({"message": "Business not found"});
        }
        business.sector = req.body.sector;
        business.name = req.body.name;
        business.email = req.body.email;
        business.password = req.body.password;
        business.address = req.body.address;
        business.phoneNumber = req.body.phoneNumber;
        business.services = req.body.services;
        business.bookingRequests = req.body.bookingRequests;
        business.landingPage = req.body.landingPage;
        business.save();
        res.json(business);
    });
});

router.patch('/businesses/:id', (req, res, next) => {
    Business.findById(req.params.id, (err, business) => {
        if(err){return next(err);}
        if(business == null){
            return res.status(404).json({"message": "Business not found"});
        }
        business.sector = (req.body.sector || business.sector);
        business.name = (req.body.name || business.name);
        business.email = (req.body.email || business.email);
        business.password = (req.body.password || business.password);
        business.address = (req.body.address || business.address);
        business.phoneNumber = (req.body.phoneNumber || business.phoneNumber);
        business.services = (req.body.services || business.services);
        business.bookingRequests = (req.body.bookingRequests || business.bookingRequests);
        business.landingPage = (req.body.landingPage || business.landingPage);
        business.save();
        res.json(business);
    });
});

module.exports = router;
