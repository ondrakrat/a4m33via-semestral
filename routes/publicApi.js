/**
 * Created by Ondřej Kratochvíl on 25.12.17.
 */
const express = require('express');
const router = express.Router();

router.get("/", function(req, res, next) {
    let lat = req.query.lat;
    let lng = req.query.lng;
    console.log(lat, lng);
    if (!lat || !lng) {
        // missing params
        res.status(400).json({
            result: null,
            error: "Both lat (latitude) and lng (longitude) must be present as query parameters."
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
    } else {
        res.status(200).json({
            result: "Success!",
            error: null
        });
    }
});

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

module.exports = router;
