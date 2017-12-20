/**
 * Created by Ondřej Kratochvíl on 20.12.17.
 */
class PlacesApiCommunication {

    static sendRequest(params) {
        const url = this._buildUrl(params);
        console.log(url);
    }

    static _buildUrl(params) {
        let searchString = `${process.env.PLACES_URL}${process.env.PLACES_FORMAT}?key=${process.env.API_KEY}`;
        const attributes = Object.getOwnPropertyNames(params);
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            console.log(attribute, params[attribute]);
            if (!!params[attribute]) {
                searchString += `&${attribute}=${params[attribute]}`;
            }
        }
        return searchString;
    }
}

module.exports = PlacesApiCommunication;
