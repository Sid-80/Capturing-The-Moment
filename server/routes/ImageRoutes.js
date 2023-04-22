const router = require("express").Router();
const ImageModel = require("../models/ImageModel"); 
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "diw7i0dny",
  api_key: "916333429764624",
  api_secret: "aHtB87pmANTuBBlwScBaYGp350M"
});

router.post('/uploads',
    async(req,res)=>{
        try {
            const file = req.files.image;
            cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
                console.log(result);
                const image = ImageModel.create({img:result.url,caption:"123"});
                res.json({image});
            });
            
        } catch (e) {
            console.log(e)
        }
    }
);

router.get('/allposts',
    async(req,res)=>{
        ImageModel.find({})
        .then((data)=>{res.json(data)})
        .catch((e)=>console.log(e));
    }
)

module.exports = router;
