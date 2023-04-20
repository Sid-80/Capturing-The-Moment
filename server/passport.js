const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:"http://localhost:5000/auth/google/callback",
            scope:["profile","email"],
        },
        (accessToken,refreshToken,profile,callback)=>{
            callback(null,profile);
        }
    )
);
passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});