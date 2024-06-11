const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
// app.engine(file_extension, engine_use(directory))
const customHelpers = require("./views/helpers/customHelpers.js");
app.engine(
    ".hbs",
    exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: customHelpers
    })
    );
app.set("view engine", ".hbs");
// replaced information
app.get("/", (req, res) => {
    // find the home.hbs file, and fill in the information
    res.render("home", {
    title: "Home Page",
    message: "Welcome to Handlebars with Express!",
    });
    });
    const sampleData = {
        user: { name: "John Doe", email: "john@example.com" },
        users: [
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
        ],
        condition: false,
        };

// if
app.get("/if", (req, res) => {
    res.render("if", { user: sampleData.user });
    });
    // unless
app.get("/unless", (req, res) => {
    res.render("unless", { condition: sampleData.condition });
    });
    // each
app.get("/each", (req, res) => {
    res.render("each", { users: sampleData.users });
    });
app.get("/custom-helper-example", (req, res) => {
        const sampleDataCH = {
        name: 'John Doe',
        birthday: '1990-01-01',
        message: 'Hello, Custom Helpers!'
        };
        res.render("chExample", sampleDataCH);
        });

const PORT = 8000;
app.listen(PORT, () => {
console.log(`http://localhost:${PORT}`);
});