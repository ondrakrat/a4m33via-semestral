const express = require('express');
const placesApi = require("./../models/PlacesApiCommunication.js");
const inputSanitizer = require("./../models/InputSanitizer.js");
const router = express.Router();

/* Search request handler. */
router.get('/', function (req, res, next) {
    const params = {
        radius: req.query.radius,
        query: inputSanitizer.sanitize(req.query.keyword),
        location: `${req.query.lat},${req.query.lng}`,
        type: !!req.query.type ? req.query.type : null,
        opennow: !!req.query.open,
        maxprice: req.query.price
    };
    placesApi.sendRequest(params, (apiResponse, error) => {
        res.render('result', {
            title: 'Restaurank',
            places: !!error ? [] : JSON.parse(apiResponse).results,
            error: error,
            mapsApiKey: process.env.MAPS_API_KEY,
            position: {
                lat: parseFloat(req.query.lat),
                lng: parseFloat(req.query.lng)
            }
        });
    });
});

module.exports = router;
