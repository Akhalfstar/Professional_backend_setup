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
    // console.log(req.body)
    if(
        [fullName , email , userName , password ].some((field)=>
            field?.trim()===""
        )
    ){
        throw new ApiError(400 , "All fields are reqired")
    }
    // console.log(email)
    // Add more validation like passsword mail 

    // user already exist check

    if( await User.findOne({
        $or : [{userName} , {email}]
    })) {
        throw new ApiError(409 , "user already exist")
    }

    // check for images cloudnary use
    const avatarLocalPath = req.files?.avatar[0]?.path       //console log
    // const profilrLocalPath = req.files?.profile[0]?.path
    let profilrLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        profilrLocalPath = req.files.coverImage[0].path
    }

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

    console.log("user is created")
    const tempUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!tempUser){
        throw new ApiError(500 , "Error in creating User")
    }

    return res.status(201).json(
        new ApiResponse(201 , tempUser ,"user is registerded")
    )

})

const UserSignIn = asynchandler( async(req , res ) =>{
    //get data from frontend
    // validation check
    // find user if exist or not
    // check paasword
    // share refresh and Acess token by cookies

    const {userName , email , password} = req.body
    if( [userName , email , password].some((field) =>{
        field?.trim === ""
    })){
        throw new ApiError(400 , "All fields are required ")
    }

    const user = await User.findOne({userName}).select("-password")
    if(!user){
        throw new ApiError(404 , "Usert not found")
    }

    const pass = await user.isPasswordCorrect(password)
    if(!pass) {
        throw new ApiError(401 , " Password is wrong ")
    }

    const acessToken = await user.genrateAccessToken()
    const refreshToken = await user.genrateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    const options = {
        httpOnly : true,
        secure : true
    }

    return req.status(200)
    .cookie("refreshToken" , refreshToken , options )
    .cookie("acessToken" , acessToken , options)
    .json(
        new ApiResponse(200 , {
            user : user, refreshToken , acessToken
        } , "user logged in")
    )

})

const logoutUser = asynchandler( async (req , res) => {
    // remove cookies
    // remove refresh token from user
})

export {registerUser}