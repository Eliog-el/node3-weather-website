const request = require("request");

const forecast = (lat, long, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=9.0820&lon=8.6753&appid=da4546be2a05ba06d06308acee31e16a';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.message) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, body.weather[0].description + ". It is currently " + body.main.temp + " degree out");
        }
    });
};

module.exports = forecast;