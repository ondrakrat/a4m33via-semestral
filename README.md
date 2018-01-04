# Restaurank
Semestral project for the A4M33VIA subject at FEE CTU.

The purpose of this project is to provide a platform, which would find nearby restaurants, 
filter them according to some criteria (card payment allowed, open after midnight, 
have draft beer etc.) and display a list sorted by their rank/distance. Additionally, 
being able to web crawl their (especially lunch) menu would be a nice to have feature.

The application is deployed on [Heroku](https://restaurank-app.herokuapp.com/).

## Features
* Find nearby bars/cafés/restaurants/nigh clubs/ATMs (current position)
* Other filter criteria - radius search, open now, price category, keywords
* Show restaurant rating, picture, average cost for a meal
* Link to menu
* Daily menu if available
* Public API for external usage (not only current location)

## Technology
Both the server and client parts are written in JavaScript, the server side is implemented 
in [NodeJS](https://nodejs.org) with the use of [Express](https://expressjs.com/) framework. 
The scripts are written in ECMAScript6 and transpiled with [Babel](https://babeljs.io/), so 
that wide range of browsers is supported. The templates on the client side are written in 
[Jade](http://jade-lang.com/), and the scripts rely on HTML5 Geolocation API.

## Running the server locally
In order to run the server locally, make sure that [npm](https://www.npmjs.com/) is installed 
on your machine. Afterwards, do the following steps:

Clone the project from git:
```
git clone https://github.com/ondrakrat/a4m33via-semestral
```

Update the variables in the [.env](.env) file, most importantly set the base URL and your 
API keys to the various APIs.

Build and run the server:
```
cd a4m33via-semestral
npm run build && npm run start
```

That's it! Your server is now running at the provided port, by default `localhost:3000`.

## API communication
*Restaurank* uses [Google Places API](https://developers.google.com/places/) for loading nearby 
restaurants, as it contains far more data than any other API. The locations are then marked 
in an interactive map using [Google Maps API](https://developers.google.com/maps/), what 
allows the usage of its native features (Street View, route planning etc.). After clicking 
any map marker, an info window is opened, and combined data from Google Places API and 
[Zomato API](https://developers.zomato.com/api) are asynchronously loaded. This includes 
most notably daily menu (if available), but also other data, such as regular menu, rating 
or average cost of meal.

#### Public API
*Restaurank* also exposes public API, which offers programmatic usage of the application, 
so that in-browser geolocation is not the only option. The API is available at the following 
endpoint:
```
/api?lat=${LATITUDE}&lng=${LONGITUDE}&radius=${RADIUS}
```
where `${LATITUDE}` and `${LONGITUDE}` are location data, and `${RADIUS}` describes how 
large the neighbourhood search is. All of those parameters are required.

The API responds with the combined data from Google Places and Zomato API. In case of 
application, external API or validation error, the API responds with the corresponding 
status as well as error description.
