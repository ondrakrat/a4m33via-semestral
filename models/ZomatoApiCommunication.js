/**
 * Created by Ondřej Kratochvíl on 21.12.17.
 */
const request = require('request');

class ZomatoApiCommunication {

    static findRestaurant(latitude, longitude, resultFunction) {
        const url = `${process.env.ZOMATO_URL}${process.env.ZOMATO_SEARCH_ENDPOINT}?&count=1&lat=${latitude}&lon=${longitude}&sort=real_distance`;
        console.log("Retrieving restaurant info", url);
        const options = {
            url: url,
            headers: {
                "Accept": "application/json",
                "user-key": process.env.ZOMATO_API_KEY
            }
        };
        request.get(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {    // TODO: what if no restaurant is found? What status?
                const res = JSON.parse(body);
                if (!!res && res.restaurants.length > 0) {
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

    static getMenu(id, resultFunction) {    // kosmac: 18311812, ppp: 18362498, lokal: 16506246
        console.log("Retrieving menu for restaurant id", id);
        const url = `${process.env.ZOMATO_URL}${process.env.ZOMATO_MENU_ENDPOINT}?res_id=${id}`;
        const options = {
            url: url,
            headers: {
                "Accept": "application/json",
                "user-key": process.env.ZOMATO_API_KEY
            }
        };
        request.get(options, (error, response, body) => {
            const res = JSON.parse(body);
            if (!error && response.statusCode === 200) {
                resultFunction(JSON.stringify(res));
            } else if (!!res && res.message === "No Daily Menu Available") {
                resultFunction(null, "No menu available");
            } else {
                console.error("Error receiving response from Zomato API", error, body);
                resultFunction(null, res.message);
            }
        });
    }
}

module.exports = ZomatoApiCommunication;
