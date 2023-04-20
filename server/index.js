require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require('./passport');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoute");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
app.use(
    cookieSession({
        name:"session",
        keys:["cyberwolve"],
        maxAge:24*60*60*100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));

mongoose.connect("mongodb://localhost:27017/Auth2",{useNewUrlParser: true, 
useUnifiedTopology: true,family: 4}).then(()=>{console.log("connected")}).catch((e)=>console.log(e))

app.use("/auth",authRoute);
app.use("/auth",userRoute);

app.listen(5000,()=>{console.log("port : 8080")})