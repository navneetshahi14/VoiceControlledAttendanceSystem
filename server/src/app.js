const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./passport");

const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacher.route");

const app = express();

app.use(express.json());
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use('/teacher',teacherRoutes);

module.exports = app;
