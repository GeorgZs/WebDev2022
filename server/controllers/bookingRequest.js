var express = require('express');
var router = express.Router({mergeParams: true});

var BookingRequest = require('../models/bookingRequest');

// /services/:serviceId/bookingRequests

router.get('/', async (req, res, next) => {
    /*
    var sort = {}

    if(req.query.sort){
        sort[req.query.sort.substring(1)] = req.query.sort.startsWith("-") ? -1 : 1 
    } 
    */
   try {
        const bookings = await BookingRequest.find({serviceId: req.params.serviceId}).exec();
        res.status(200).json(bookings.map(booking => visibleDataFor(booking)));
   } catch (err) {
        handleError(err)
   }
    
});

router.post('/', async (req, res, handleError) => {
    try {
        const bookingData = req.body;
        const errors = validateBooking(bookingData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for creating a booking', errors })
        }

        bookingData.serviceId = req.params.serviceId;
        const provider  = await BookingRequest.findById(bookingData.serviceId);

        if (!provider) {
            res.status(404).json({ message: 'Unknown Booking' });
            return;
        }

        const booking = new BookingRequest(bookingData);
        await booking.save();
        res.status(201).json(visibleDataFor(booking));
    } catch (err) {
        handleError(err);
    }
});

router.delete('/', async (req, res, handleError) => {
    try {
        const bookings = await BookingRequest.find({serviceId: req.params.serviceId}).exec();
        await BookingRequest.deleteMany(bookings);
        res.status(204).json({"bookingRequests": bookings.map(booking => visibleDataFor(booking))});
    } catch (err) {
        handleError(err);
    }
});

router.get('/:bookingRequestId', async (req, res, handleError) => { 
    try {
        const serviceId = req.params.serviceId;
        const bookingRequestId = req.params.bookingRequestId;

        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId});
    
        if (!booking) {
            res.status(404).json({ message: 'Unknown booking!' });
            return;
        }

        res.status(200).json(visibleDataFor(booking));
    } catch (err) {
        handleError(err);
    }
}); 

router.delete('/:bookingRequestId', async (req, res, handleError) => {
    try {
        const serviceId = req.params.serviceId;
        const bookingRequestId = req.params.bookingRequestId;

        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId});
    
        if (booking) {
            await booking.delete();
        }

        res.status(204).json(visibleDataFor(booking));
    } catch (err) {
        handleError(err);
    }
});

router.put('/:bookingRequestId', async (req, res, handleError) => {
    try {
        const updatedBooking = req.body;
        const errors = validateBooking(updatedBooking);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating booking', errors})
            return;
        }

        const serviceId = req.params.serviceId;
        const bookingRequestId = req.params.bookingRequestId;
        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId});

        if (!booking) {
            res.status(404).json({ message: 'Unknown booking!'});
        }

        Object.assign(booking, updatedBooking);
        await booking.save();
        res.status(200).json(visibleDataFor(booking));
    } catch (err) {
        handleError(err);
    }
});

router.patch('/:bookingRequestId', async (req, res, handleError) => {
    try {
        const updatedBooking = req.body;
        const errors = validateBooking(updatedBooking, { partial: true });

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating booking', errors})
            return;
        }

        const serviceId = req.params.serviceId;
        const bookingRequestId = req.params.bookingRequestId;
        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId});

        if (!booking) {
            res.status(404).json({ message: 'Unknown booking!'});
        }

        Object.assign(booking, updatedBooking);
        await booking.save();
        res.status(200).json(visibleDataFor(booking));
    } catch (err) {
        handleError(err);
    }
});

module.exports = router;

function validateBooking(bookingData, { partial } = { partial: false }) {
    const errors = [];

    if (!bookingData.message) {
        if (!partial) errors.push('message: missing');
    } else {
        if (typeof bookingData.message !== 'string') errors.push('message: type');
        bookingData.message = bookingData.message.trim();
        if (bookingData.message.length < 1) errors.push('message: invalid length');
    }

    if (bookingData.date) {
        if (typeof bookingData.date !== 'string') errors.push('message: type');
        if (bookingData.date.length < 1) errors.push('message: invalid length');
    }

    if (!bookingData.timePeriod) {
        if (!partial) errors.push('message: missing');
    } else {
        if (typeof bookingData.timePeriod !== 'string') errors.push('message: type');
        bookingData.message = bookingData.message.trim();
        if (bookingData.timePeriod.length < 1) errors.push('message: invalid length');
    }

    if (!bookingData.user) {
        if (!partial) errors.push('message: missing');
    } else {
        
        if (!bookingData.user.email) {
            if (!partial) errors.push('message: missing');
        } else {
            if (typeof bookingData.user.email !== 'string') errors.push('message: type');
            bookingData.user.email = bookingData.message.trim();
            if (bookingData.user.email.length < 1) errors.push('message: invalid length');
        } 
        
        if (bookingData.user.phoneNumber) {
            if (typeof bookingData.user.email !== 'string') errors.push('message: type');
            bookingData.user.email = bookingData.message.trim();
            if (bookingData.user.email.length < 1) errors.push('message: invalid length');
        } 
        
        if (!bookingData.user.name) {
            if (!partial) errors.push('message: missing');
        } else {
            if (typeof bookingData.user.name !== 'string') errors.push('message: type');
            bookingData.user.name = bookingData.message.trim();
            if (bookingData.user.name.length < 1) errors.push('message: invalid length');
        }
    }

    return errors;
}

function visibleDataFor(booking) {
    const data = booking.toObject();
    delete data.__v;
    return data;
}