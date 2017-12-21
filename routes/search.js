const express = require('express');
const placesApi = require("./../models/PlacesApiCommunication.js");
const router = express.Router();

/* Search request handler. */
router.get('/', function (req, res, next) {
    const params = {
        radius: req.query.radius,
        query: req.query.keyword.split(" ").join("+"),
        location: `${req.query.lat},${req.query.lng}`,
        type: !!req.query.type ? req.query.type : null,
        opennow: !!req.query.open,
        maxprice: req.query.price
    };
    let apiResponse;
    placesApi.sendRequest(params).pipe(res);
    // res.render('result', {
    //     title: 'Restaurank',
    //     places: apiResponse
    // });
});

module.exports = router;
