import mongoose from 'mongoose'

const userScheema = new mongoose.Schema({} , {timestamps:true})

export const User = mongoose.model("user" , userScheema)