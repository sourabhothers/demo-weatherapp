// Modules
const express = require("express"),
  hbs = require("hbs"),
  path = require("path"),
  app = express();

// Utility Modules
const getWeather = require("./utils/getWeather");

const port = process.env.PORT || 8000;

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Setup Static directory
app.use(express.static(path.join(__dirname, "../public")));

// Shortcut functions
function cl(d) {
  console.log(d);
}

app.get("/", (req, res) => {
  res.render("index", { title: "Weather" });
});

app.get("/weather", (req, res) => {
  const { city = "none" } = req.query;
  getWeather(city, (filteredWeather) => {
    res.send(filteredWeather);
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText:
      'Please go to Homepage try search To get temperature of that city or State',
    title: "Help",
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404", errorMessage: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
