const express = require('express');
const LandingPage = require('../models/landingPage');
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const fs = require('fs').promises;

const router = express.Router({ mergeParams: true });
router.use(fileUpload());

router.get('/', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const landingPage = await LandingPage.findOne({ providerId });

        if (!landingPage) {
            res.status(404).json({ message: 'Unknown landing page!' });
            return;
        }
        res.status(200).json(visibleDataFor(landingPage));
    }
    catch (err) {
        handleError(err);
    }
});


router.put('/', async (req, res, handleError) => {
    try {
        const updatedLandingPageData = req.body;
        const errors = validateLandingPage(updatedLandingPageData);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a landing page!', errors });
            return;
        }

        const providerId = req.params.providerId;
        const landingPage = await LandingPage.findOne({ providerId });

        if (!landingPage) {
            res.status(404).json({ message: 'Unknown landing page!' });
            return;
        }

        Object.assign(landingPage, updatedLandingPageData);
        await landingPage.save();
        res.status(200).json(visibleDataFor(landingPage));
    }
    catch (err) {
        handleError(err);
    }
});

router.patch('/', async (req, res, handleError) => {
    try {
        console.log(req.body)
        if(req.files) {
            console.log('hello')
        }
        const updatedLandingPageData = req.body;
        const errors = validateLandingPage(updatedLandingPageData, { partial: true });

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a landing page!', errors });
            return;
        }

        const providerId = req.params.providerId;
        const landingPage = await LandingPage.findOne({ providerId });

        if (!landingPage) {
            res.status(404).json({ message: 'Unknown landing page!' });
            return;
        }

        Object.assign(landingPage, updatedLandingPageData);
        await landingPage.save();
        res.status(200).json(visibleDataFor(landingPage));
    }
    catch (err) {
        handleError(err);
    }
});

router.put('/logo', async (req, res, handleError) => {
    try {
        
        const updatedLandingPageData = req.body;
        const errors = validateLandingPage(updatedLandingPageData, { partial: true });

        if (errors.length > 0) {
            res.status(400).json({ message: 'Invalid data for updating a landing page!', errors });
            return;
        }

        const providerId = req.params.providerId;
        const landingPage = await LandingPage.findOne({ providerId });

        if (!landingPage) {
            res.status(404).json({ message: 'Unknown landing page!' });
            return;
        }

        if(req.files) {
            const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'landingPageLogos' });

            if(landingPage.logo) {
                bucket.find({ filename: landingPage.logo }).forEach(file => bucket.delete(file._id));
            }

            try{
                landingPage.logo = `/api/v1/providers/${providerId}/landingPages/logo?v=${Date.now()}`

                const stream = bucket.openUploadStream(landingPage.logo, {
                    contentType: req.files.image.mimetype,
                });
                stream.write(req.files.image.data, err => console.log('Stream file to mongo failed:', err));
                stream.end();
            }
            catch(err) {
                console.log(err);
              res.status(400).json({ message: 'Invalid image for updating a landing page!', errors });
              return;
            }
        }


        Object.assign(landingPage, updatedLandingPageData);
        await landingPage.save();
        res.status(200).json(visibleDataFor(landingPage));
    }
    catch (err) {
        handleError(err);
    }
});

router.get('/logo', async (req, res, handleError) => {
    try {
        const providerId = req.params.providerId;
        const landingPage = await LandingPage.findOne({ providerId });
    
        if (!landingPage) {
            res.status(404).json({ message: 'Unknown landing page!' });
            return;
        }

        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'landingPageLogos' });
        bucket.openDownloadStreamByName(landingPage.logo).pipe(res);
    }
    catch (err) {
        handleError(err);
    }
});

module.exports = router;


function validateLandingPage(landingPageData, { partial } = { partial: false }) {
    const errors = [];

    if ("providerId" in landingPageData) {
        errors.push('providerId: disallowed');
    }

    if ("logo" in landingPageData) {
        errors.push('logo: should-be-uploaded');
    }

    if ("primaryColor" in landingPageData) {
        if (typeof landingPageData.primaryColor !== 'string') {
            errors.push('primaryColor: type');
        }
        else {
            landingPageData.primaryColor = landingPageData.primaryColor.trim();
            if (landingPageData.primaryColor.length < 1) errors.push('primaryColor: invalid');
        }
    }

    if ("content" in landingPageData) {
        if (typeof landingPageData.content !== 'string') {
            errors.push('content: type');
        }
        else {
            landingPageData.content = landingPageData.content.trim();
            if (landingPageData.content.length < 1) errors.push('content: invalid');
        }
    }

    return errors;
}

function visibleDataFor(landingPage) {
    const data = landingPage.toObject();
    delete data.__v;
    return data;
}
