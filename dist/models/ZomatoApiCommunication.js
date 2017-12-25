"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Ondřej Kratochvíl on 21.12.17.
 */
var request = require('request');

var ZomatoApiCommunication = function () {
    function ZomatoApiCommunication() {
        _classCallCheck(this, ZomatoApiCommunication);
    }

    _createClass(ZomatoApiCommunication, null, [{
        key: "findRestaurant",
        value: function findRestaurant(latitude, longitude, resultFunction) {
            var url = "" + process.env.ZOMATO_URL + process.env.ZOMATO_SEARCH_ENDPOINT + "?&count=1&lat=" + latitude + "&lon=" + longitude + "&sort=real_distance";
            console.log("Retrieving restaurant info", url);
            var options = {
                url: url,
                headers: {
                    "Accept": "application/json",
                    "user-key": process.env.ZOMATO_API_KEY
                }
            };
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // TODO: what if no restaurant is found? What status?
                    var res = JSON.parse(body);
                    if (!!res && res.restaurants.length > 0) {
                        // TODO wrong restaurant is sometimes returned
                        resultFunction(JSON.stringify(res.restaurants[0].restaurant));
                    } else {
                        resultFunction(null);
                    }
                } else {
                    console.error("Error receiving response from Zomato API", error, body);
                    resultFunction(null, body);
                }
            });
        }
    }, {
        key: "getMenu",
        value: function getMenu(id, resultFunction) {
            // kosmac: 18311812, ppp: 18362498, lokal: 16506246
            console.log("Retrieving daily menu for restaurant id", id);
            var url = "" + process.env.ZOMATO_URL + process.env.ZOMATO_MENU_ENDPOINT + "?res_id=" + id;
            var options = {
                url: url,
                headers: {
                    "Accept": "application/json",
                    "user-key": process.env.ZOMATO_API_KEY
                }
            };
            request.get(options, function (error, response, body) {
                var res = JSON.parse(body);
                if (!error && response.statusCode === 200) {
                    resultFunction(JSON.stringify(res));
                } else if (!!res && res.message === "No Daily Menu Available") {
                    resultFunction(null, "No daily menu available");
                } else {
                    console.error("Error receiving response from Zomato API", error, body);
                    resultFunction(null, res.message);
                }
            });
        }
    }]);

    return ZomatoApiCommunication;
}();

module.exports = ZomatoApiCommunication;