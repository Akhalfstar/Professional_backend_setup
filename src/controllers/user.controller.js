import { asynchandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/apierror.js"
import dbConnect from "../dbs/index.js"
import { User } from "../model/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudnary.js"
import { ApiResponse } from "../utils/apiresponse.js"


const registerUser = asynchandler( async (req , res) => {
    // get user data from frontend
    // Appply validation 
    // check if user is already exist
    // check fro images , avtar
    // upload them to cloudanary
    // create user object = create enrty in db
    // remove password and refresh token field from response
    // check user creation 
    // return res


    const {userName , email , fullName , password  } = req.body
    if(
        [fullName , email , userName , password ].some((field)=>
            field?.trim()===""
        )
    ){
        throw new ApiError(400 , "All fields are reqired")
    }
    console.log(email)
    // Add more validation like passsword mail 

    // user already exist check

    if( await User.findOne({
        $or : [{userName} , {email}]
    })) {
        throw new ApiError(409 , "user already exist")
    }

    // check for images cloudnary use
    const avatarLocalPath = req.files?.avatar[0]?.path       //console log
    const profilrLocalPath = req.files?.profile[0]?.path

    if(!avatarLocalPath) {
        throw new ApiError(400 , "Avatar Local path is reqired")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const profile = await uploadOnCloudinary(profilrLocalPath)

    if(!avatar) {
        throw new ApiError(400 , "Avatar is reqired")
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        profile : profile?.url || "",
        email,
        password,
        userName
    })

    const tempUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!tempUser){
        throw new ApiError(500 , "Error in creating User")
    }

    return res.status(201).json(
        new ApiResponse(201 , tempUser ,"user is registerded")
    )

})

export {registerUser}