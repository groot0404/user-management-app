const cloudinary = require('cloudinary').v2
const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')

//import environment varables
require('dotenv').config()//process.env.variableName

//configure cloudinary
cloudinary.config({
    cloud_name:process.env.PORT,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

//configure cloudinary storage
let clStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"vnr2023",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()
    }
})

//configure multer
let multerObj = multer({storage:clStorage})

//export multerObj
module.exports= multerObj;