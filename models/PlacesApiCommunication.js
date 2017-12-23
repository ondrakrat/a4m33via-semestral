/**
 * Created by Ondřej Kratochvíl on 20.12.17.
 */
const request = require('request');

class PlacesApiCommunication {

    static sendRequest(params, resultFunction) {
        const url = this._buildUrl(params);
        request.get(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resultFunction(body);
            } else {
                console.error("Error receiving response from Google Places API", error, body);
                resultFunction(null, body);
            }
        });
    }

    static _buildUrl(params) {
        let baseUrl = `${process.env.PLACES_URL}${process.env.PLACES_FORMAT}?key=${process.env.PLACES_API_KEY}`;
        const attributes = Object.getOwnPropertyNames(params);
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            if (!!params[attribute]) {
                baseUrl += `&${attribute}=${params[attribute]}`;
            }
        }
        return baseUrl;
    }
}

module.exports = PlacesApiCommunication;
