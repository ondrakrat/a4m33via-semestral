/**
 * Created by Ondřej Kratochvíl on 20.12.17.
 */
const request = require('request');

class PlacesApiCommunication {

    static sendRequest(params, resultFunction) {
        const url = this._buildUrl(params);
        return request.get(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resultFunction(body);
            } else {
                console.error("Error receiving response from Google Places API", error);
            }
        });
    }

    static _buildUrl(params) {
        let searchString = `${process.env.PLACES_URL}${process.env.PLACES_FORMAT}?key=${process.env.API_KEY}`;
        const attributes = Object.getOwnPropertyNames(params);
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            if (!!params[attribute]) {
                searchString += `&${attribute}=${params[attribute]}`;
            }
        }
        return searchString;
    }
}

module.exports = PlacesApiCommunication;
