/**
 * Created by Ondřej Kratochvíl on 22.12.17.
 */
const BASE_URL = "http://localhost:3000/";

function getMenu(latitude, longitude) {
    const url = `${BASE_URL}search/menu?lat=${latitude}&lng=${longitude}`;

    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // TODO properly format, add pics
            console.log(request.responseText);
            document.querySelector("#menu").innerHTML = request.responseText;
        } else {
            console.error("Error when fetching menu", error, response, body);
        }
    };
    request.onerror = function () {
        console.error("Error when fetching menu", error, response, body);
    };
    request.send();
}