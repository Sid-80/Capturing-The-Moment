const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();
const User = require("./models/userModel");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback:true
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){
          // already have this user
          console.log('user is: ', currentUser);
          done(null, currentUser);
      } else {
          // if not, create user in our db
          new User({
              googleId: profile.id,
              username: profile.displayName,
              thumbnail: profile._json.image.url
          }).save().then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
          });
      }
  });
  }
));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})