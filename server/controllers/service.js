var express = require('express');
var Service = require('../models/service');
var Provider = require('../models/provider');

var router = express.Router({ mergeParams: true });

// /providers/:providerId/services

router.post('/', async (req, res, handleError) => {
    try {
        const serviceData = req.body;
        const errors = validateService(serviceData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for creating a service', errors });
            return;
        }

        serviceData.providerId = req.params.providerId;
        const provider = await Provider.findById(serviceData.providerId);

        if (!provider) {
            res.status(404).json({ message: 'Unknown provider' });
            return;
        }

        const service = new Service(serviceData);
        await service.save();
        res.status(201).json(visibleDataFor(service));
    }
    catch (err) {
        handleError(err);
    }
});



router.get('/', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const services = await Service.find({ providerId }).exec();
        res.status(200).json(services.map(service => visibleDataFor(service)));

    }
    catch (err) {
        handleError(err);

    }
});

/*
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
*/


router.delete('/', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const services = await Service.find({ providerId }).exec();
        await Service.deleteMany({providerId});
        res.status(204).json(services.map(service => visibleDataFor(service)));

    }
    catch (err) {
        handleError(err);
    }
});

router.get('/:serviceId', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const serviceId = req.params.serviceId;
        const service = await Service.findOne({ providerId, _id: serviceId });

        if (!service) {
            res.status(404).json({ message: 'Unknown service!' });
            return;
        }

        res.status(200).json(visibleDataFor(service));
    }
    catch (err) {
        handleError(err);
    }
});

router.put('/:serviceId', async (req, res, handleError) => {
    try {
        const updatedServiceData = req.body;
        const errors = validateService(updatedServiceData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a service', errors });
            return;
        }

        const providerId = req.params.providerId;
        const serviceId = req.params.serviceId;
        const service = await Service.findOne({ providerId, _id: serviceId });

        if (!service) {
            res.status(404).json({ message: 'Unknown service!' });
            return;
        }

        Object.assign(service, updatedServiceData);
        await service.save();
        res.status(200).json(visibleDataFor(service));
    }
    catch (err) {
        handleError(err);
    }
});

router.patch('/:serviceId', async (req, res, handleError) => {
    try {
        const updatedServiceData = req.body;
        const errors = validateService(updatedServiceData, { partial: true });

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a service', errors });
            return;
        }

        const providerId = req.params.providerId;
        const serviceId = req.params.serviceId;
        const service = await Service.findOne({ providerId, _id: serviceId });

        if (!service) {
            res.status(404).json({ message: 'Unknown service!' });
            return;
        }

        Object.assign(service, updatedServiceData);
        await service.save();
        res.status(200).json(visibleDataFor(service));
    }
    catch (err) {
        handleError(err);
    }
});

router.delete('/:serviceId', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const serviceId = req.params.serviceId;
        const service = await Service.findOne({ providerId, _id: serviceId });

        if (service) {
            await service.delete();
        }

        res.status(204).json(service);
    }
    catch (err) {
        handleError(err);
    }
});

module.exports = router;



function validateService(serviceData, { partial } = { partial: false }) {
    const errors = [];

    if (!serviceData.name) {
        if (!partial) errors.push('name: missing');
    }
    else {
        if (typeof serviceData.name !== 'string') errors.push('name: type');
        serviceData.name = serviceData.name.trim();
        if (serviceData.name.length < 1) errors.push('name: invalid');
    }

    if (!serviceData.price) {
        if (!partial) errors.push('price: missing');
    }
    else {
        if (typeof serviceData.price !== 'number') errors.push('price: type');
        if (serviceData.price < 0) errors.push('price: invalid');
    }

    if (serviceData.duration) {
        if (typeof serviceData.duration !== 'number') errors.push('duration: type');
        if (serviceData.duration < 1) errors.push('duration: invalid');
    }

    if (serviceData.details) {
        if (typeof serviceData.details !== 'string') errors.push('details: type');
        serviceData.details = serviceData.details.trim();
        if (serviceData.details.length < 1) errors.push('details: invalid');
    }

    return errors;
}

function visibleDataFor(service) {
    const data = service.toObject();
    delete data.__v;
    return data;
}
