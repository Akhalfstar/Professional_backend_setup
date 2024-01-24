import mongoose from 'mongoose'

const VideoScheema = new mongoose.Schema({
    videoFile :{
        type : String,
        required : true,
    },
    thumbnail :{
        type : String,
        required : true,
    },
    tital :{
        type : String,
        required : true,
    },
    description :{
        type : String,
        required : true,
    },
    duration :{
        type : String, // cloudnary
        required : true,
    },
    views :{
        type : Number,
        default : 0,
    },
    isPublished :{
        type : Boolean,
        default : true,
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }


} , {timestamps:true})

export const Video = mongoose.model("Video" , VideoScheema)