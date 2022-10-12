const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Provider = require('../models/provider');
const LandingPage = require('../models/landingPage');
const sendEmail = require('../emailService');
// const verifyToken = require("../jwtVerifier")

// Auth Info
// ---------
// - JWT tokens are like billboards on a busy road, don't put private information in them
// - The security from the JWT tokens comes from the signing, since we created it, we can trust the user is logged in
// - Someone who has a token is logged in
// - Add verifyToken and a check for forbidden actions to all protected routes
// - Protected routes are actions that only should be allowed when the provider is logged in

const router = express.Router({ mergeParams: true });

router.post('/register', async (req, res, handleError) => {
    try {
        const providerData = req.body;
        
        const errors = validateProvider(providerData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for creating a provider!', errors });
            return;
        }

        const existingProvider = await Provider.find({ email: providerData.email })
        if (existingProvider !== null || existingProvider !== undefined) {
            providerData.password = await bcrypt.hash(providerData.password, 10)
            const provider = new Provider(providerData);
            await provider.save();

            const token = jwt.sign(
                { providerId: provider._id },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            )
            provider.token = token

            const landingPage = new LandingPage({ providerId: provider._id });
            await landingPage.save();
            sendEmail(providerData.email, 'welcomeMail.html');

            return res.status(201).json(visibleDataFor(provider));
        }
        return res.status(409).send("Provider already exists.")
    }
    catch (error) {
        handleError(error);
    }
});

router.post('/login', async (req, res, handleError) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(401).json({ "message": "invalid credentials" })
        }

        const provider = await Provider.findOne({ email: email });

        if (!provider) return res.status(404).json({ "Message:": "Provider not found" })

        if (email === provider.email && await bcrypt.compare(password, provider.password)) {
            const token = jwt.sign(
                { providerId: provider._id },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            )
            provider.token = token

            res.status(200).json({token: provider.token, id: provider._id});
        } else {
            res.status(401).json({ "message": "invalid credentials" })
        }

    } catch (error) {
        handleError(error);
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

        res.status(200).json(visibleDataFor(provider));
    }
    catch (err) {
        handleError(err);
    }
});


router.put('/:providerId', async (req, res, handleError) => {
    try {
        // You could move this over to verifyToken
        const providerId = req.params.providerId;

        /*
        if (providerId !== req.auth.providerId) {
            res.status(403).json({ message: 'Forbidden!' });
            return;
        }
        */  

        const updatedProviderData = req.body;
        const errors = validateProvider(updatedProviderData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a provider!', errors });
            return;
        }

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

router.delete('/:providerId', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const provider = await Provider.findById(providerId);
        const landingPage = await LandingPage.findOne({ providerId });

        if (landingPage) await landingPage.delete();
        if (provider) await provider.delete();
        res.status(204).json(visibleDataFor(provider));
    }
    catch (err) {
        handleError(err);
    }
});

module.exports = router;



function validateProvider(providerData, { partial } = { partial: false }) {
    const errors = [];

    if (!('email' in providerData)) {
        if (!partial) errors.push('email: missing');
    }
    else {
        if (typeof providerData.email !== 'string') {
            errors.push('email: type');
        }
        else {
            providerData.email = providerData.email.trim();
            if (!providerData.email.includes('@') || !providerData.email.includes('.') || providerData.email.length < 5) errors.push('email: invalid');
        }
    }

    if (!('password' in providerData)) {
        if (!partial) errors.push('password: missing');
    }
    else {
        if (typeof providerData.password !== 'string') errors.push('password: type');
        if (providerData.password.length < 4) errors.push('password: invalid');
    }

    if (!('name' in providerData)) {
        if (!partial) errors.push('name: missing');
    }
    else {
        if (typeof providerData.name !== 'string') {
            errors.push('name: type');
        }
        else {
            providerData.name = providerData.name.trim();
            if (providerData.name.length < 1) errors.push('name: invalid');
        }
    }

    if (!('address' in providerData)) {
        if (!partial) errors.push('address: missing');
    }
    else {
        if (typeof providerData.address !== 'string') {
            errors.push('address: type');
        }
        else {
            providerData.address = providerData.address.trim();
            if (providerData.address.length < 1) errors.push('address: invalid');
        }
    }

    if (!('sector' in providerData)) {
        if (!partial) errors.push('sector: missing');
    }
    else {
        if (typeof providerData.sector !== 'string') {
            errors.push('sector: type');
        }
        else {
            providerData.sector = providerData.sector.trim();
            if (providerData.sector.length < 1) errors.push('sector: invalid');
        }
    }

    if ('phoneNumber' in providerData) {
        if (typeof providerData.phoneNumber !== 'string') {
            errors.push('phoneNumber: type');
        }
        else {
            providerData.phoneNumber = providerData.phoneNumber.trim();
            if (providerData.phoneNumber.length < 1) errors.push('phoneNumber: invalid');
        }
    }

    return errors;
}

function visibleDataFor(provider) {
    if (!provider) return null;

    const data = provider.toObject();
    delete data.__v;
    delete data.password;
    return data;
}
