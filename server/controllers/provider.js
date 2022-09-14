const express = require('express');
const provider = require('../models/provider');
const Provider = require('../models/provider');



const router = express.Router({ mergeParams: true });

router.post('/', async (req, res, handleError) => {
    try {
        const providerData = req.body;
        const errors = validateProvider(providerData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for creating a provider!', errors });
            return;
        }

        const provider = new Provider(providerData);
        await provider.save();
        res.status(201).json(visibleDataFor(provider));
    }
    catch (err) {
        handleError(err);
    }
});

router.get('/:providerId', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const provider = await Provider.findById(providerId);

        if (!provider) {
            res.status(404).json({ message: 'Unknown provider!' });
            return;
        }

        res.json(visibleDataFor(provider));
    }
    catch (err) {
        handleError(err);
    }
});

router.delete('/:providerId', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const provider = await Provider.findById(providerId);

        if (provider) await provider.delete();
        res.status(204).json(visibleDataFor(provider));
    }
    catch (err) {
        handleError(err);
    }
});

router.put('/:providerId', async (req, res, handleError) => {
    try {
        const updatedProviderData = req.body;
        const errors = validateProvider(updatedProviderData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a provider!', errors });
            return;
        }

        const providerId = req.params.providerId;
        const provider = await Provider.findById(providerId);

        if (!provider) {
            res.status(404).json({ message: 'Unknown provider!' });
            return;
        }

        Object.assign(provider, updatedProviderData);
        await provider.save();
        res.status(200).json(visibleDataFor(provider));
    }
    catch (err) {
        handleError(err);
    }
});

router.patch('/:providerId', async (req, res, handleError) => {
    try {
        const updatedProviderData = req.body;
        const errors = validateProvider(updatedProviderData, { partial: true });

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a provider!', errors });
            return;
        }

        const providerId = req.params.providerId;
        const provider = await Provider.findById(providerId);

        if (!provider) {
            res.status(404).json({ message: 'Unknown provider!' });
            return;
        }

        Object.assign(provider, updatedProviderData);
        await provider.save();
        res.status(200).json(visibleDataFor(provider));
    }
    catch (err) {
        handleError(err);
    }
});

module.exports = router;



function validateProvider(providerData, { partial } = { partial: false }) {
    const errors = [];

    if (!providerData.email) {
        if (!partial) errors.push('email: missing');
    }
    else {
        if (typeof providerData.email !== 'string') errors.push('email: type');
        providerData.email = providerData.email.trim();
        if (!providerData.email.includes("@") || !providerData.email.includes(".") || providerData.email.length < 5) errors.push('email: invalid');
    }

    if (!providerData.password) {
        if (!partial) errors.push('password: missing');
    }
    else {
        if (typeof providerData.password !== 'string') errors.push('password: type');
        if (providerData.password.length < 4) errors.push('password: invalid');
    }

    if (!providerData.name) {
        if (!partial) errors.push('name: missing');
    }
    else {
        if (typeof providerData.name !== 'string') errors.push('name: type');
        providerData.name = providerData.name.trim();
        if (providerData.name.length < 1) errors.push('name: invalid');
    }

    if (!providerData.address) {
        if (!partial) errors.push('address: missing');
    }
    else {
        if (typeof providerData.address !== 'string') errors.push('address: type');
        providerData.address = providerData.address.trim();
        if (providerData.address.length < 1) errors.push('address: invalid');
    }

    if (!providerData.sector) {
        if (!partial) errors.push('sector: missing');
    }
    else {
        if (typeof providerData.sector !== 'string') errors.push('sector: type');
        providerData.sector = providerData.sector.trim();
        if (providerData.sector.length < 1) errors.push('sector: invalid');
    }

    if (providerData.phoneNumber) {
        if (typeof providerData.phoneNumber !== 'string') errors.push('phoneNumber: type');
        providerData.phoneNumber = providerData.phoneNumber.trim();
        if (providerData.phoneNumber.length < 1) errors.push('phoneNumber: invalid');
    }

    return errors;
}

function visibleDataFor(provider) {
    const data = provider.toObject();
    delete data.__v;
    delete data.password;
    return data;
}
