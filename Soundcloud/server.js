const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/api/users")
const profile = require('./routes/api/profile');
const passport = require("passport")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Passport middleware
app.use(passport.initialize());

// passport Config
require("./config/passport")(passport);

// use routes
app.use("/api/users",users)
app.use("/api/profile", profile);
// PORT
const port = process.env.PORT || 5000;

// connect to mongodb
mongoose.connect(process.env.MONGOD_URI || "mongodb://localhost/soundclouddb",{useNewUrlParser:true})

// App server listening
app.listen(port,()=>console.log(`server running on port ${port}`))