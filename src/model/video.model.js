import mongoose from 'mongoose'

const VideoScheema = new mongoose.Schema({
    


} , {timestamps:true})

export const Video = mongoose.model("Video" , VideoScheema)