/**
 * Created by Ondřej Kratochvíl on 22.12.17.
 */
const BASE_URL = "http://localhost:3000/";

function getMenu(latitude, longitude) {
    const url = `${BASE_URL}search/menu?lat=${latitude}&lng=${longitude}`;
    const element = document.querySelector("#menu");

    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // TODO properly format, add pics
            const json = JSON.parse(request.responseText);
            if (!!json.error) {
                element.innerHTML = `<div class='alert alert-danger'>${json.error}</div>`;
            }
            if (!!json.warning) {
                element.innerHTML = `<div class='alert alert-warning'>${json.warning}</div>`;
            }
            if (!!json.menu && json.menu.length > 0) {
                _parseMenu(json, element);
            }
            // TODO render imgs
        } else {
            element.innerHTML = "<div class='alert alert-danger'>Error when fetching menu</div>";
            console.error("Error when fetching menu", request.responseText);
        }
    };
    request.onerror = function () {
        element.innerHTML = "<div class='alert alert-danger'>Error when fetching menu</div>";
        console.error("Error when fetching menu", request.responseText);
    };
    request.send();
}

function _parseMenu(json, element) {
    let menu = "<h6>Daily menus:</h6>";
    for (let i = 0; i < json.menu.length; ++i) {
        const dailyMenuElement = json.menu[i].daily_menu;
        menu += `
            <p>${dailyMenuElement.start_date} - ${!!dailyMenuElement.end_date ? dailyMenuElement.end_date : '?'}</p>
            <table class='table table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>Item</th>
                        <th scope='col'>Price</th>
                    </tr>
                </thead>
                <tbody>
        `;
        for (let j = 0; j < dailyMenuElement.dishes.length; ++j) {
            const dish = dailyMenuElement.dishes[j].dish;
            menu += `
                <tr class='table-primary table-responsive-lg'>
                    <th scope='row'>${dish.name}</th>
                    <td>${dish.price}</td>
                </tr>
            `;
        }
        menu += "</tbody></table>";
    }
    element.innerHTML = menu;
}