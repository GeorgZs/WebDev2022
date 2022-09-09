var express = require('express');
var router = express.Router();

var BookingRequest = require('../models/bookingRequest');
var Business = require('../models/business');

router.get('/businesses/:id/bookingRequests', (req, res, next) => {
    BookingRequest.find({businessId: req.params.id}, (err, business) => {
        if(err) return next(err);
        if(business == null) {
            return res.status(404).json({"message": "Business not found"});
        }
        res.json({"bookingRequests": business.bookingRequests});
    });
});

router.post('/businesses/:businessId/services/:serviceId/bookingRequests', (req, res, next) => {
    var new_bookingRequest = new BookingRequest(req.body);
    new_bookingRequest.businessId = req.params.businessId;
    new_bookingRequest.serviceId = req.params.serviceId;

    new_bookingRequest.save((err) => {
        if(err){return next(err);}
        res.status(201).json(new_bookingRequest);
    });
});

router.delete('/bookingRequests', (req, res, next) => {
    BookingRequest.deleteMany((err, bookingRequests) => {
        if(err){return next(err);}
        res.json({"bookingRequests": bookingRequests});
    });
});

router.delete('/businesses/:id/bookingRequests', (req, res, next) => {
    Business.deleteMany({businessId: req.params.id}, (err, bookingRequests) => {
        if(err){return next(err);}
        res.json({"bookingRequests": bookingRequests});
    });
});

router.get('/businesses/:id/bookingRequests/:id', (req, res, next) => { 
    BookingRequest.findById({businessId: req.params.id}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        res.json(bookingRequest);
    });
}); 

router.delete('/businesses/:id/bookingRequests/:id', (req, res, next) => {
    BookingRequest.findOneAndDelete({businessId: req.params.id}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        res.json(bookingRequest);
    });
});

router.put('/businesses/:id/bookingRequests/:id', (req, res, next) => {
    BookingRequest.findById({businessId: req.params.id}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        bookingRequest.message = req.body.message;
        bookingRequest.date = req.body.date;
        bookingRequest.timePeriod = req.body.timePeriod;
        bookingRequest.user = req.body.user;
        bookingRequest.serviceId = req.body.serviceId;
        bookingRequest.save();
        res.json(bookingRequest);
    });
});

router.patch('/businesses/:id/bookingRequests/:id', (req, res, next) => {
    BookingRequest.findById({businessId: req.params.id}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        bookingRequest.message = (req.body.message || bookingRequest.message);
        bookingRequest.date = (req.body.date || bookingRequest.date);
        bookingRequest.timePeriod = (req.body.timePeriod || bookingRequest.timePeriod);
        bookingRequest.user = (req.body.user || bookingRequest.user);
        bookingRequest.serviceId = (req.body.serviceId || bookingRequest.serviceId);
        bookingRequest.save();
        res.json(bookingRequest);
    });
});

module.exports = router;
