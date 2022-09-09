var express = require('express');
var router = express.Router();

var LandingPage = require('../models/landingPage');

router.post('/', (req, res, next) => {
    var new_landingPage = new LandingPage(req.body);
    new_landingPage.businessId = req.params.businessId;

    new_landingPage.save((err) => {
        if(err) {
            return next(err);
        }
        res.status(201).json({new_landingPage});
    });
});

router.get('/' , (req, res, next) => {
    LandingPage.find({businessId: req.params.businessId}, (err, landingPages) => {
        if(err) {
            return next(err);
        }
        if(landingPages == null) {
            return res.status(404).json({"Message": "Landing page not found"});
        }
        res.json({"landingPages": landingPages});
    });
});

router.delete('/', (req, res, next) => {
    LandingPage.deleteMany({businessId: req.params.businessId}, (err, landingPages) => {
        if(err) {
            return next(err);
        } 
        res.json({"landingPages": landingPages});
    });
});

router.get('/', (req, res, next) => {
    LandingPage.findOne({businessId: req.params.businessId}, (err, landingPages) => {
        if(err) {
            return next(err);
        }
        if(landingPages == null) {
            res.status(404).json({"Message": "Landing page not found"});
        }
        res.json(landingPages);
    });
});

router.put('/', (req, res, next) => {
    LandingPage.findOne({businessId: req.params.businessId}, (err, landingPages) => {
        if(err) {
            return next(err);
        }
        if(landingPages == null) {
            res.status(404).json({"Message": "Landing page not found"});
        }
        landingPages.details = req.params.details;
        landingPages.primaryColor = req.params.primaryColor;
        landingPages.font = req.params.font;
        landingPages.businessId = req.params.businessId;
        landingPages.save();
        res.json(landingPages);
    });
});

router.patch('/', (req, res, next) => {
    LandingPage.findOne({businessId: req.params.businessId}, (err, landingPages) => {
        if(err) {
            return next(err);
        }
        if(landingPages == null) {
            res.status(404).json({"Message": "Landing page not found"});
        }
        landingPages.details = (req.params.details || landingPages.details);
        landingPages.primaryColor = (req.params.primaryColor || landingPages.primaryColor);
        landingPages.font = (req.params.font || landingPages.font);
        landingPages.businessId = (req.params.businessId || landingPages.businessId);
        landingPages.save();
        res.json(landingPages);
    });
});

router.delete('/', (req, res, next) => {
    LandingPage.deleteOne({businessId: req.params.businessId}, (err, landingPages) => {
        if(err) {
            return next(err);
        }
        if(landingPages == null) {
            return res.status(404).json({"Message": "Landing page not found"});
        }
        res.json(landingPages);
    });
});

module.exports = router;