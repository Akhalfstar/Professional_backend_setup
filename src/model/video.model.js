import mongoose from 'mongoose'

const VideoScheema = new mongoose.Schema({
    username :{
        type : String,
        unique : true,
        required : true,
        lowecase : true,
        trim : true,
        index : true
    },
    email :{
        type : String,
        unique : true,
        required : true,
        lowecase : true,
        trim : true
    },
    fullname :{
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avtar :{
        type : String,
        unique : true,
        required : true,
    },
    username :{
        type : String,
    },
    watchHistory :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video"
        }  
    ],
    password :{
        type : String,
        required : [true , "password is required"]
    },
    refreshToken :{
        type : String,
        required : true
    }




} , {timestamps:true})

export const Video = mongoose.model("Video" , VideoScheema)