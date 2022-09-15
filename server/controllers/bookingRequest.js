const express = require('express');
const BookingRequest = require('../models/bookingRequest');
const Service = require('../models/service');

const router = express.Router({ mergeParams: true });

// /services/:serviceId/bookingRequests

router.get('/', async (req, res, handleError) => {
    /*
    var sort = {}

    if(req.query.sort){
        sort[req.query.sort.substring(1)] = req.query.sort.startsWith("-") ? -1 : 1 
    } 
    */
    try {
        const bookings = await BookingRequest.find({ serviceId: req.params.serviceId }).exec();
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
            return;
        }

        bookingData.serviceId = req.params.serviceId;
        const service = await Service.findById(bookingData.serviceId);

        if (!service) {
            res.status(404).json({ message: 'Unknown service' });
            return;
        }

        bookingData.providerId = service.providerId;
        const booking = new BookingRequest(bookingData);
        await booking.save();
        res.status(201).json(visibleDataFor(booking));
    } catch (err) {
        handleError(err);
    }
});

router.delete('/', async (req, res, handleError) => {
    try {
        const bookings = await BookingRequest.find({ serviceId: req.params.serviceId }).exec();
        await BookingRequest.deleteMany({ serviceId: req.params.serviceId });
        res.status(204).json(bookings.map(booking => visibleDataFor(booking)));
    } catch (err) {
        handleError(err);
    }
});

router.get('/:bookingRequestId', async (req, res, handleError) => {
    try {
        const serviceId = req.params.serviceId;
        const bookingRequestId = req.params.bookingRequestId;

        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId });

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

        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId });

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
            res.status(400).json({ message: 'Invalid data for updating booking', errors })
            return;
        }

        const serviceId = req.params.serviceId;
        const bookingRequestId = req.params.bookingRequestId;
        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId });

        if (!booking) {
            res.status(404).json({ message: 'Unknown booking!' });
            return;
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
            res.status(400).json({ message: 'Invalid data for updating booking', errors })
            return;
        }

        const serviceId = req.params.serviceId;
        const bookingRequestId = req.params.bookingRequestId;
        const booking = await BookingRequest.findOne({ serviceId, _id: bookingRequestId });

        if (!booking) {
            res.status(404).json({ message: 'Unknown booking!' });
            return;
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

    if ("providerId" in bookingData) {
        errors.push('providerId: disallowed');
    }

    if ("serviceId" in bookingData) {
        errors.push('serviceId: disallowed');
    }

    if (!("timePeriod" in bookingData)) {
        if (!partial) errors.push('timePeriod: missing');
    } else {
        if (typeof bookingData.timePeriod !== 'string') {
            errors.push('timePeriod: type');
        }
        else {
            bookingData.timePeriod = bookingData.timePeriod.trim();
            if (bookingData.timePeriod.length < 1) errors.push('timePeriod: invalid length');
        }
    }

    if (!("user" in bookingData)) {
        if (!partial) errors.push('user: missing');
    } else {
        if (!("name" in bookingData.user)) {
            if (!partial) errors.push('user.name: missing');
        } else {
            if (typeof bookingData.user.name !== 'string') {
                errors.push('user.name: type');
            }
            else {
                bookingData.user.name = bookingData.user.name.trim();
                if (bookingData.user.name.length < 1) errors.push('user.name: invalid length');
            }
        }

        if (!("email" in bookingData.user)) {
            if (!partial) errors.push('user.email: missing');
        } else {
            if (typeof bookingData.user.email !== 'string') {
                errors.push('user.email: type');
            }
            else {
                bookingData.user.email = bookingData.user.email.trim();
                if (!bookingData.user.email.includes('@') || !bookingData.user.email.includes('.') || bookingData.user.email.length < 5) errors.push('user.email: invalid');
            }
        }

        if ("phoneNumber" in bookingData.user) {
            if (typeof bookingData.user.phoneNumber !== 'string') {
                errors.push('user.phoneNumber: type');
            }
            else {
                bookingData.user.phoneNumber = bookingData.user.phoneNumber.trim();
                if (bookingData.user.phoneNumber.length < 1) errors.push('user.phoneNumber: invalid length');
            }
        }
    }

    if ("date" in bookingData) {
        if (typeof bookingData.date !== 'string') {
            errors.push('date: type');
        }
        else {
            if (bookingData.date.length < 1) errors.push('date: invalid length');
        }
    }

    if ("message" in bookingData) {
        if (typeof bookingData.message !== 'string') {
            errors.push('message: type');
        }
        else {
            bookingData.message = bookingData.message.trim();
            if (bookingData.message.length < 1) errors.push('message: invalid length');
        }
    }

    return errors;
}

function visibleDataFor(booking) {
    if (!booking) return null;

    const data = booking.toObject();
    delete data.__v;
    return data;
}
