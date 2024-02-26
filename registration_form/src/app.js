const express = require("express");
const path = require("path");
const hbs = require("hbs");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
const connectDB = require("../db/db_connection");
const Registration = require("../models/registration");
const { json } = require("express");

dotenv.config({
  path: "./env",
});
const app = express();
// FILE path
const static_Path = path.join(__dirname, "../public");
const template_Path = path.join(__dirname, "../templates/views");
const partials_Path = path.join(__dirname, "../templates/partials");

// use middleware
app.use(express.static(static_Path));
app.set("view engine", "hbs");
app.set("views", template_Path);
hbs.registerPartials(partials_Path);

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ extended: false, limit: "18kb" }));

// route
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
//create a new user in our database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmPassword;

    if (password === cpassword) {
      const RegistrationStudent = new Registration({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: password,
        confirmPassword: cpassword,
      });
      const registered = await RegistrationStudent.save();
      res.status(201).render("index");
      console.log("data is posted in database");
    } else {
      res.send("password is not matched!!");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

app.get("/service", (req, res) => {
  res.render("service");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/about", (req, res) => {
  res.render("about");
});

connectDB()
  .then(() => {
        app.on("ERR", (err) => {
        console.log(`Error`, err);
        throw err;
        });
        app.listen(PORT, () => {
        console.log(`Server is running successfully at: ${PORT}`);
        });
    })
  .catch((err) => {
        console.log(`Mongo db connection failed`, err);
  });


