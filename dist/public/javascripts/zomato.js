"use strict";

/**
 * Created by Ondřej Kratochvíl on 22.12.17.
 */
var BASE_URL = "http://localhost:3000/";

function getMenu(latitude, longitude) {
    var url = BASE_URL + "search/menu?lat=" + latitude + "&lng=" + longitude;
    var element = document.querySelector("#zomato-details");

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var json = JSON.parse(request.responseText);
            console.log("Zomato response", json);
            if (!!json.detail) {
                _parseDetail(json.detail, element);
            }
            if (!!json.menu && json.menu.length > 0) {
                _parseMenu(json, element);
            }
            if (!!json.error) {
                element.innerHTML = element.innerHTML + ("<div class='alert alert-danger'>" + json.error + "</div>");
            }
            if (!!json.warning) {
                element.innerHTML = element.innerHTML + ("<div class='alert alert-warning'>" + json.warning + "</div>");
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
    var content = "\n        <div class=\"detail\">\n            <h5>Details:</h5>\n            <img src=\"" + detail.featured_image + "\">\n            <div>\n                <strong>Average cost for two: </strong> \n                " + (!!detail.average_cost_for_two && !!detail.currency ? detail.average_cost_for_two + " " + detail.currency : "-") + "\n            </div>\n            <a href=\"" + detail.menu_url + "\">Menu link</a>\n        </div>\n    ";
    element.innerHTML = element.innerHTML + content;
}

function _parseMenu(json, element) {
    var menu = "<div class='menu'><h5>Daily menus:</h5>";
    for (var i = 0; i < json.menu.length; ++i) {
        var dailyMenuElement = json.menu[i].daily_menu;
        menu += "\n            <p>" + dailyMenuElement.start_date + " - " + (!!dailyMenuElement.end_date ? dailyMenuElement.end_date : '?') + "</p>\n            <table class='table table-hover'>\n                <thead>\n                    <tr>\n                        <th scope='col'>Item</th>\n                        <th scope='col'>Price</th>\n                    </tr>\n                </thead>\n                <tbody>\n        ";
        for (var j = 0; j < dailyMenuElement.dishes.length; ++j) {
            var dish = dailyMenuElement.dishes[j].dish;
            menu += "\n                <tr class='table-primary table-responsive-lg'>\n                    <th scope='row'>" + dish.name + "</th>\n                    <td>" + (!!dish.price ? dish.price : "-") + "</td>\n                </tr>\n            ";
        }
        menu += "</tbody></table></div>";
    }
    element.innerHTML = element.innerHTML + menu;
}