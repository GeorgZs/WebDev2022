var express = require('express');
var router = express.Router();

var Service = require('../models/service');

router.post('/services', (req, res, next) => {
    var new_service = new Service(req.body);
    new_service.save((err) => {
        if(err) {
            return next(err);
        }
        res.status(201).json(new_service);
    }); 
});

router.get('/services', (req, res, next) => {
    Service.find((err, services) => {
        if(err) {
            return next(err);
        }
        res.json({"services": services});
    });
});

router.delete('/services', (req, res, next) => {
    Service.deleteMany((err, services) => {
        if(err) {
            return next(err);
        }
        res.json({"services": services});
    });
});

router.get('/services/:id', (req, res, next) => {
    Service.findById(req.params.id, (err, service) => {
        if(err) {
            return next(err);
        }
        if(service == null) {
            return res.status(404).json({"Message": "Service not found"});
        }
        res.json(service);
    });
});

router.put('/services/:id', (req, res, next) => {
    Service.findById(req.params.id, (err, service) => {
        if(err) {
            return next(err);
        }
        if(service == null) {
            return res.status(404).json({"Message": "Service not found"});
        }
        service.duration = req.body.duration;
        service.details = req.body.details;
        service.name = req.body.name;
        service.price = req.body.price;
        service.save();
        res.json(service);
    });
});

router.patch('/services/:id', (req, res, next) => {
    Service.findById(req.params.id, (err, service) => {
        if(err) {
            return next(err);
        }
        if(service == null) {
            return res.status(404).json({"Message": "Service not found"});
        }
        service.duration = (req.body.duration || service.duration);
        service.details = (req.body.details || service.details);
        service.name = (req.body.name || service.name);
        service.price = (req.body.price || service.price);
        service.save();
        res.json(service);
    });
});

router.delete('/services/:id', (req, res, next) => {
    Service.findByIdAndDelete(req.params.id, (err, service) => {
        if(err) {
            return next(err);
        }
        if(service == null) {
            return res.status(404).json({"Message:": "Service not found"});
        }
        res.json(service);
    });
});

module.exports = router;