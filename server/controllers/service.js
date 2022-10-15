var express = require('express');
var Service = require('../models/service');
var Provider = require('../models/provider');

var router = express.Router({ mergeParams: true });

// /providers/:providerId/services

router.post('/providers/:providerId/services', async (req, res, handleError) => {
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

router.get('/services', async (req, res, handleError) => {
    //when searching for service
    try {
        const sortBy = req.query.sort
        const queryParams = req.query.queryResult

        if(queryParams) {
            const results = await Service.aggregate([
                {
                    $search: {
                        index: 'default',
                        autocomplete: {
                            query: queryParams,
                            path: 'name',
                            fuzzy: {
                                maxEdits: 1,
                            },
                            tokenOrder: "sequential",
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        price: 1,
                        duration: 1,
                        details: 1,
                        address: 1,
                        providerId: 1,
                    }
                },
                {
                    $limit: 10,
                }
            ])
            results.sort((a,b) => {
                a[sortBy] < b[sortBy] ? 1 : -1
            })

            console.log(results)
            if (results) return res.status(200).json(results)
        } else {
        
        const services = sortBy !== undefined ? await Service.find().sort(sortBy).exec()
        : await Service.find().sort('name').exec()
        console.log(services)


        res.status(200).json(services.map(service => visibleDataFor(service)));
        }
    }
    catch (err) {
        handleError(err);
    }
});

router.get('/providers/:providerId/services', async (req, res, handleError) => {
    try {
        const sortBy = req.query.sort ? req.query.sort.toString() : "";

        const providerId = req.params.providerId;
        const services = await Service.find({ providerId }).sort(sortBy).exec();
        res.status(200).json(services.map(service => visibleDataFor(service)));
    }
    catch (err) {
        handleError(err);
    }
});

router.delete('/providers/:providerId/services', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const services = await Service.find({ providerId }).exec();
        await Service.deleteMany({ providerId });
        res.status(204).json(services.map(service => visibleDataFor(service)));

    }
    catch (err) {
        handleError(err);
    }
});

router.get('/providers/:providerId/services/:serviceId', async (req, res, handleError) => {
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

router.put('/providers/:providerId/services/:serviceId', async (req, res, handleError) => {
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

router.patch('/providers/:providerId/services/:serviceId', async (req, res, handleError) => {
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

router.delete('/providers/:providerId/services/:serviceId', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const serviceId = req.params.serviceId;
        const service = await Service.findOne({ providerId, _id: serviceId });

        if (service) {
            await service.delete();
        }

        res.status(204).json(visibleDataFor(service));
    }
    catch (err) {
        handleError(err);
    }
});

router.put('services/:serviceId', async (req, res, handleError) => {
    try {
        const updatedServiceData = req.body;
        const errors = validateService(updatedServiceData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a service', errors });
            return;
        }

        const serviceId = req.params.serviceId;
        const service = await Service.findOne({ _id: serviceId });

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

module.exports = router;



function validateService(serviceData, { partial } = { partial: false }) {
    const errors = [];

    if ("providerId" in serviceData) {
        errors.push('providerId: disallowed');
    }

    if (!("name" in serviceData)) {
        if (!partial) errors.push('name: missing');
    }
    else {
        if (typeof serviceData.name !== 'string') {
            errors.push('name: type');
        }
        else {
            serviceData.name = serviceData.name.trim();
            if (serviceData.name.length < 1) errors.push('name: invalid');
        }
    }

    if (!("price" in serviceData)) {
        if (!partial) errors.push('price: missing');
    }
    else {
        if (typeof serviceData.price !== 'number') {
            errors.push('price: type');
        }
        else {
            if (serviceData.price < 0) errors.push('price: invalid');
        }
    }

    if ("duration" in serviceData) {
        if (typeof serviceData.duration !== 'number') {
            errors.push('duration: type');
        }
        else {
            if (serviceData.duration < 1) errors.push('duration: invalid');
        }
    }

    if ("details" in serviceData) {
        if (typeof serviceData.details !== 'string') {
            errors.push('details: type');
        }
        else {
            serviceData.details = serviceData.details.trim();
            if (serviceData.details.length < 1) errors.push('details: invalid');
        }
    }

    return errors;
}

function visibleDataFor(service) {
    if (!service) return null;

    const data = service.toObject();
    delete data.__v;
    return data;
}
