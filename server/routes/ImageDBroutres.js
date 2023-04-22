const router = require("express").Router();
const ImageModel = require("../models/ImageModel"); 

router.post('/uploads',
    async(req,res)=>{
        try {
            console.log(req.body);
            
            res.json(image);
        } catch (e) {
            console.log(e);
        }
    }
);

module.exports = router;