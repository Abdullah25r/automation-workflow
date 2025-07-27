import multer from "multer";
const {CloudinaryStorage} = require('multer-storage-cloudinary')
import cloudinary from './cloudinary'

const storage = new CloudinaryStorage({
    params:{
        folder:'my-app',
        allowed_formats:  ["jpg", "jpeg", "png", "webp"]
    }
})
const upload = multer({ storage });

module.exports = upload;