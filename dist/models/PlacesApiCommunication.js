"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Ondřej Kratochvíl on 20.12.17.
 */
var request = require('request');

var PlacesApiCommunication = function () {
    function PlacesApiCommunication() {
        _classCallCheck(this, PlacesApiCommunication);
    }

    _createClass(PlacesApiCommunication, null, [{
        key: "sendRequest",
        value: function sendRequest(params, resultFunction) {
            var url = this._buildUrl(params);
            request.get(url, function (error, response, body) {
                console.log(error, body);
                if (!error && response.statusCode === 200) {
                    resultFunction(body);
                } else {
                    console.error("Error receiving response from Google Places API", error, body);
                    resultFunction(null, body);
                }
            });
        }
    }, {
        key: "_buildUrl",
        value: function _buildUrl(params) {
            var baseUrl = "" + process.env.PLACES_URL + process.env.PLACES_FORMAT + "?key=" + process.env.PLACES_API_KEY;
            var attributes = Object.getOwnPropertyNames(params);
            for (var i = 0; i < attributes.length; i++) {
                var attribute = attributes[i];
                if (!!params[attribute]) {
                    baseUrl += "&" + attribute + "=" + params[attribute];
                }
            }
            return baseUrl;
        }
    }]);

    return PlacesApiCommunication;
}();

module.exports = PlacesApiCommunication;