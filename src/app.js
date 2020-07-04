const { geocode, forecast } = require("./utils/geocode");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Loi Tran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Loi Tran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Me",
  });
});

app.get("/weather", (req, res) => {
  console.log("res", { req: req.query });
  if (!req.query.address && !req.query.coords) {
    res.send({
      error: "You must provide a address term or coords",
    });
  }

  if (req.query.address) {
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
      if (error) {
        return console.log(error);
      }
      forecast(latitude, longitude, (error, { summary }) => {
        if (error) {
          return console.log(error);
        }
        res.send({
          location,
          title: "Weather",
          forecast: summary,
          address: req.query.address,
        });
      });
    });
  } else {
    forecast(req.query.lat, req.query.long, (error, { summary }) => {
      if (error) {
        return console.log(error);
      }
      res.send({
        title: "Weather",
        forecast: summary,
        address: req.query.address,
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    name: "Me",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Me",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
