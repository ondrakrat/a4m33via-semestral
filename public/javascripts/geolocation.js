/**
 * Created by Ondřej Kratochvíl on 18.12.17.
 */
export function getLocation() {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                return {
                    latitude: latitude,
                    longitude: longitude
                };
            },
            _errorCallback,
            {maximumAge: 600000, timeout: 5000, enableHighAccuracy: true}
        )
    } else {
        console.error("Geolocation API is not supported in your browser.");
    }
}

function _errorCallback(error) {
    console.error("Error occurred when retrieving current position", error);
}