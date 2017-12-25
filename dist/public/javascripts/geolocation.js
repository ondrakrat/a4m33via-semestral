"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Ondřej Kratochvíl on 18.12.17.
 */
var Geolocation = function () {
    function Geolocation() {
        _classCallCheck(this, Geolocation);
    }

    _createClass(Geolocation, [{
        key: "_errorCallback",
        value: function _errorCallback(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("User denied the request for Geolocation.", error);
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Location information is unavailable.", error);
                    break;
                case error.TIMEOUT:
                    console.error("The request to get user location timed out.", error);
                    break;
                case error.UNKNOWN_ERROR:
                    console.error("An unknown error occurred.", error);
                    break;
            }
        }
    }], [{
        key: "getLocation",
        value: function getLocation(callback) {
            var _this = this;

            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(function (position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    _this.coords = {
                        latitude: latitude,
                        longitude: longitude
                    };
                    if (!!callback) {
                        callback(_this);
                    }
                }, this._errorCallback, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true });
            } else {
                console.error("Geolocation API is not supported in your browser.");
            }
        }
    }]);

    return Geolocation;
}();