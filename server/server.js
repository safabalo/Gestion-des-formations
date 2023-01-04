const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
require("dotenv").config();


require("./config/db");
require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// Routers
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);


app.all("*", (req, res) => {
  res.send("Page not found");
});

// Port
app.listen(process.env.PORT || 2001, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);

module.exports = app;