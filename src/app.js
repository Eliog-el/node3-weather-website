const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars enine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Elijah Olusola",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Eliog Olusola",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        name: "ELiog Olusola",
        title: "Get Help",
        message: "You can always get help here.",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address!",
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forcast: "It is snowing",
    //     location: "Nigeria",
    //     address: req.query.address
    // });
});


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query.search);
    res.json({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Elijah",
        errorMessage: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Eliog Olusola",
        errorMessage: "Page not found",
    });
});

// app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log("Server is up on port 3000");
}); 
