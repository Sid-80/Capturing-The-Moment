const router = require("express").Router();
const passport = require("passport");
const User = require("../models/userModel");

router.get("/login/success",async(req,res)=>{
    if (req.user) {
        const {displayName,id} = req.user;
        const checkUser = await User.findOne({id});
        if(!checkUser){
            const user = await User.create({
                username:displayName,
                id,
                email:req.user.emails[0].value,
                picture:req.user.photos[0].value
            });
        }
        res.status(200).json({
            error:false,msg:"Successfully loged in",
            user:req.user,
            // cookies:req.cookies
        });
    }else{
        res.status(403).json({
            error:true,msg:"Not Authorized"
        });
    }
})

router.get('/login/failed',(req,res)=>{
    res.status(401).json({
        error:true,
        msg:"Login Failed",
    });
});

router.get(
    '/google/callback',
    passport.authenticate("google",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:'/login/failed',
    })
)

router.get('/google',passport.authenticate("google",["profile","email"]));

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;