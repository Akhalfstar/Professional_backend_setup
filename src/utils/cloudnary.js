import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const uploadOnCloudinary = async function (localPath){
    try {
        if(!localPath) return null
        const res = await cloudinary.uploader(localPath , {
            resource_type : "auto",
        })
        // file updloaded
        console.log("file uploaded url : ", res.url)
        return res

        
    } catch (error) {
        fs.unlinkSync(localPath) // remove locally save temprary file
        return null;
    }
}

export {uploadOnCloudinary}