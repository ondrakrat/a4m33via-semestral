/**
 * Created by Ondřej Kratochvíl on 22.12.17.
 */
const BASE_URL = "http://localhost:3000/";

function getMenu(latitude, longitude) {
    const url = `${BASE_URL}search/menu?lat=${latitude}&lng=${longitude}`;
    const element = document.querySelector("#zomato-details");

    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const json = JSON.parse(request.responseText);
            console.log("Zomato response", json);
            if (!!json.detail) {
                _parseDetail(json.detail, element);
            }
            if (!!json.menu && json.menu.length > 0) {
                _parseMenu(json, element);
            }
            if (!!json.error) {
                element.innerHTML = element.innerHTML + `<div class='alert alert-danger'>${json.error}</div>`;
            }
            if (!!json.warning) {
                element.innerHTML = element.innerHTML + `<div class='alert alert-warning'>${json.warning}</div>`;
            }
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

function _parseDetail(detail, element) {
    const content = `
        <div class="detail">
            <h5>Details:</h5>
            <img src="${detail.featured_image}">
            <div>
                <strong>Average cost for two: </strong> 
                ${(!!detail.average_cost_for_two && !!detail.currency)
                    ? (detail.average_cost_for_two + " " + detail.currency) 
                    : "-"}
            </div>
            <a href="${detail.menu_url}">Menu link</a>
        </div>
    `;
    element.innerHTML = element.innerHTML + content;
}

function _parseMenu(json, element) {
    let menu = "<div class='menu'><h5>Daily menus:</h5>";
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
                    <td>${!!dish.price ? dish.price : "-"}</td>
                </tr>
            `;
        }
        menu += "</tbody></table></div>";
    }
    element.innerHTML = element.innerHTML + menu;
}