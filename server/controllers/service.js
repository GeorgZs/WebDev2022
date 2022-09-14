var express = require('express');
var router = express.Router({ mergeParams: true });

var Service = require('../models/service');

// /businesses/:businessId/services
router.post('/', (req, res, next) => {
    var new_service = new Service(req.body);
    new_service.businessId = req.params.businessId;
    new_service.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(201).json(new_service);
    });
});

router.get('/', (req, res, next) => {
    if (req.query.sort) {
        var sortBy = req.query.sort.toString();
        Service.find({ businessId: req.params.businessId }).sort(sortBy).exec((err, service) => {
            if (err) {
                return next(err);
            }
            res.json({ "services": service });
        });

    } else {
        Service.find({ businessId: req.params.businessId }, (err, service) => {
            if (err) {
                return next(err);
            }
            if (service == null) {
                return res.status(404).json({ "Message": "Business not found" });
            }
            res.json({ "services": service });
        });
    }
});


router.delete('/', (req, res, next) => {
    Service.deleteMany({ businessId: req.params.businessId }, (err, services) => {
        if (err) {
            return next(err);
        }
        res.json({ "services": services });
    });
});

router.get('/:serviceId', (req, res, next) => {
    Service.findOne({ businessId: req.params.businessId, _id: req.params.serviceId }, (err, service) => {
        if (err) {
            return next(err);
        }
        if (service == null) {
            return res.status(404).json({ "Message": "Service not found" });
        }
        res.json(service);
    });
});

router.put('/:serviceId', (req, res, next) => {
    Service.findOne({ businessId: req.params.businessId, _id: req.params.serviceId }, (err, service) => {
        if (err) {
            return next(err);
        }
        if (service == null) {
            return res.status(404).json({ "Message": "Service not found" });
        }
        service.duration = req.body.duration;
        service.details = req.body.details;
        service.name = req.body.name;
        service.price = req.body.price;
        service.save();
        res.json(service);
    });
});

router.patch('/:serviceId', (req, res, next) => {
    Service.findOne({ businessId: req.params.businessId, _id: req.params.serviceId }, (err, service) => {
        if (err) {
            return next(err);
        }
        if (service == null) {
            return res.status(404).json({ "Message": "Service not found" });
        }
        service.duration = (req.body.duration || service.duration);
        service.details = (req.body.details || service.details);
        service.name = (req.body.name || service.name);
        service.price = (req.body.price || service.price);
        service.save();
        res.json(service);
    });
});

router.delete('/:serviceId', (req, res, next) => {
    Service.deleteOne({ businessId: req.params.businessId, _id: req.params.serviceId }, (err, service) => {
        if (err) {
            return next(err);
        }
        if (service == null) {
            return res.status(404).json({ "Message:": "Service not found" });
        }
        res.json(service);
    });
});

module.exports = router;
