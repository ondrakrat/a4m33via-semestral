/**
 * Created by Ondřej Kratochvíl on 18.12.17.
 */
class Geolocation {

    static getLocation(callback) {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.coords = {
                        latitude: latitude,
                        longitude: longitude
                    };
                    if (!!callback) {
                        callback(this);
                    }
                },
                this._errorCallback,
                {maximumAge: 600000, timeout: 5000, enableHighAccuracy: true}
            );
        } else {
            console.error("Geolocation API is not supported in your browser.");
        }
    }

    _errorCallback(error) {
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
}