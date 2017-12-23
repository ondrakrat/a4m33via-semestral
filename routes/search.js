const express = require('express');
const placesApi = require("./../models/PlacesApiCommunication.js");
const zomatoApi = require("./../models/ZomatoApiCommunication.js");
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

router.get('/menu', function(req, res, next) {
    zomatoApi.findRestaurant(req.query.lat, req.query.lng, (apiResponse, error) => {
        // TODO handle errors
        console.log(apiResponse, error);
        res.send(apiResponse);
    });
});

module.exports = router;
