'use strict';

/**
 * Created by Ondřej Kratochvíl on 25.12.17.
 */
var express = require('express');
var request = require('request');
var router = express.Router();

router.get("/", function (req, res, next) {
    var lat = req.query.lat;
    var lng = req.query.lng;
    var radius = req.query.radius;
    if (!lat || !lng || !radius) {
        // missing params
        res.status(400).json({
            result: null,
            error: "Radius and both lat (latitude) and lng (longitude) must be present as query parameters"
        });
    } else if (!parseFloat(lat) || lat < -90 || lat > 90) {
        // invalid lat
        res.status(400).json({
            result: null,
            error: "Latitude must be float number in the interval (-90; 90)"
        });
    } else if (!parseFloat(lng) || lng < -180 || lng > 180) {
        // invalid lng
        res.status(400).json({
            result: null,
            error: "Longitude must be float number in the interval (-180; 180)"
        });
    } else if (!parseInt(radius) || radius <= 0) {
        // invalid radius
        res.status(400).json({
            result: null,
            error: "Radius must be a positive integer"
        });
    } else {
        var url = process.env.BASE_URL + 'search?lat=' + lat + '&lng=' + lng + '&radius=' + radius + '&type=restaurant&api=true';
        console.log(url);
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.status(200).json({
                    result: JSON.parse(body),
                    error: null
                });
            } else {
                res.status(500).json({
                    result: null,
                    error: error
                });
                console.error("Error during API request", error, body);
            }
        });
    }
});

module.exports = router;