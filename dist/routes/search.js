"use strict";

var express = require('express');
var placesApi = require("./../models/PlacesApiCommunication.js");
var zomatoApi = require("./../models/ZomatoApiCommunication.js");
var inputSanitizer = require("./../models/InputSanitizer.js");
var router = express.Router();

/* Search request handler. */
router.get('/', function (req, res, next) {
    var params = {
        radius: req.query.radius,
        query: inputSanitizer.sanitize(req.query.keyword),
        location: req.query.lat + "," + req.query.lng,
        type: !!req.query.type ? req.query.type : null,
        opennow: !!req.query.open,
        maxprice: req.query.price
    };
    placesApi.sendRequest(params, function (apiResponse, error) {
        var model = {
            title: 'Restaurank',
            places: !!error ? [] : JSON.parse(apiResponse).results,
            error: error,
            mapsApiKey: process.env.MAPS_API_KEY,
            position: {
                lat: parseFloat(req.query.lat),
                lng: parseFloat(req.query.lng)
            }
        };
        if (!!req.query.api && req.query.api === "true") {
            res.json(model);
        } else {
            res.render('result', model);
        }
    });
});

router.get('/menu', function (req, res, next) {
    zomatoApi.findRestaurant(req.query.lat, req.query.lng, function (apiResponse, error) {
        if (!!error) {
            res.send({
                error: "Error when retrieving daily menu."
            });
        } else {
            var restaurant = JSON.parse(apiResponse);
            if (!!restaurant) {
                retrieveMenu(res, restaurant);
            } else {
                res.send({
                    warning: "No daily menu available."
                });
            }
        }
    });
});

function retrieveMenu(res, restaurant) {
    zomatoApi.getMenu(restaurant.id /*"16506246"*/, function (apiResponse, error) {
        var json = JSON.parse(apiResponse);
        if (error === "No daily menu available") {
            res.send({
                detail: restaurant,
                warning: error
            });
        } else if (!!error || json.status !== "success") {
            res.send({
                detail: restaurant,
                error: error
            });
        } else {
            res.send({
                detail: restaurant, // restaaurant details
                menu: json.daily_menus // array of daily_menu elements
            });
        }
    });
}

module.exports = router;