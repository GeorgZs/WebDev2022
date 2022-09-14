var express = require('express');
var router = express.Router({mergeParams: true});

var BookingRequest = require('../models/bookingRequest');

// /services/:serviceId/bookingRequests

router.get('/', (req, res, next) => {
    var sort = {}

    if(req.query.sort){
        sort[req.query.sort.substring(1)] = req.query.sort.startsWith("-") ? -1 : 1 
    }
    BookingRequest.find({serviceId: req.params.serviceId}).sort(sort).exec((err, business) => {
        if(err) return next(err);
        if(business == null) {
            return res.status(404).json({"message": "Business not found"});
        }
        res.json({"bookingRequests": business.bookingRequests});
    });
});

router.post('/', (req, res, next) => {
    var new_bookingRequest = new BookingRequest(req.body);
    new_bookingRequest.businessId = req.params.businessId;
    new_bookingRequest.serviceId = req.params.serviceId;

    new_bookingRequest.save((err) => {
        if(err){return next(err);}
        res.status(201).json(new_bookingRequest);
    });
});

router.delete('/', (req, res, next) => {
    BookingRequest.deleteMany({serviceId: req.params.serviceId}, (err, bookingRequests) => {
        if(err){return next(err);}
        res.json({"bookingRequests": bookingRequests});
    });
});

router.get('/:bookingRequestId', (req, res, next) => { 
    BookingRequest.findById({serviceId: req.params.serviceId}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        res.json(bookingRequest);
    });
}); 

router.delete('/:bookingRequestId', (req, res, next) => {
    BookingRequest.findOneAndDelete({bookingRequestId: req.params.bookingRequestId}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        res.json(bookingRequest);
    });
});

router.put('/:bookingRequestId', (req, res, next) => {
    BookingRequest.findById({bookingRequestId: req.params.bookingRequestId}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        bookingRequest.businessId = req.body.businessId;
        bookingRequest.message = req.body.message;
        bookingRequest.date = req.body.date;
        bookingRequest.timePeriod = req.body.timePeriod;
        bookingRequest.user = req.body.user;
        bookingRequest.serviceId = req.body.serviceId;
        bookingRequest.save();
        res.json(bookingRequest);
    });
});

router.patch('/:bookingRequestId', (req, res, next) => {
    BookingRequest.findById({bookingRequestId: req.params.bookingRequestId}, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        bookingRequest.businessId = (req.body.businessId || bookingRequest.businessId);
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
