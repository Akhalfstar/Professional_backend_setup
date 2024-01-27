import mongoose from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userScheema = new mongoose.Schema({
    userName :{
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
    fullName :{
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar :{
        type : String,
        required : true,
    },
    Profile :{
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
    },


} , {timestamps:true})

userScheema.pre("save" , async function (next){
    if(!this.isModified("password")) next()
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userScheema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password , this.password)
}

userScheema.methods.genrateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userScheema.methods.genrateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("user" , userScheema)