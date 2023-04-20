const User = require("../models/userModel");
const router = require("express").Router();

router.post('/getUserInfo',
    async(req,res)=>{
        const {username,email,picture} = req.body;
        console.log(username)
        const checkUser = await User.findOne({email});
        if (!checkUser) {
            const user = User.create({
                username,email,picture
            });
            return res.json(user);
        }
        return res.json({msg:"Added"});
    }
)

module.exports = router;
