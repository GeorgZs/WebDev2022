var express = require('express');
var router = express.Router();

var BookingRequest = require('../models/bookingRequest');

router.post('/bookingRequest', (req, res, next) => {
    var new_bookingRequest = new BookingRequest(req.body);
    new_bookingRequest.save((err) => {
        if(err){return next(err);}
        res.status(201).json(new_bookingRequest);
    });
});

router.get('/bookingRequest', (req, res, next) => {
    BookingRequest.find((err, bookingRequests) => {
        if(err){return next(err);}
        res.json({"bookingRequests": bookingRequests});
    });
}); 

router.delete('/bookingRequest', (req, res, next) => {
    BookingRequest.deleteMany((err, bookingRequests) => {
        if(err){return next(err);}
        res.json({"bookingRequests": bookingRequests});
    });
});

router.get('/bookingRequest/:id', (req, res, next) => { 
    BookingRequest.findById(req.params.id, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        res.json(bookingRequest);
    });
}); 

router.delete('/bookingRequest/:id', (req, res, next) => {
    BookingRequest.findOneAndDelete(req.params.id, (err, bookingRequest) => {
        if(err){return next(err);}
        if(bookingRequest == null){
            return res.status(404).json({"message": "BookingRequest not found"});
        }
        res.json(bookingRequest);
    });
});

router.put('/bookingRequest/:id', (req, res, next) => {
    BookingRequest.findById(req.params.id, (err, bookingRequest) => {
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

router.patch('/bookingRequest/:id', (req, res, next) => {
    BookingRequest.findById(req.params.id, (err, bookingRequest) => {
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
