import { User } from "../model/user.model";
import { ApiError } from "../utils/apierror";
import { asynchandler } from "../utils/asynchandler";
import jwt  from "jsonwebtoken";

const verifyJWT = asynchandler(async (req , res , next) =>{
    try {
        const token = await req.cookie?.acessToken ||
        req.header("Authorization")?.replace("Bearer " , "")
    
        if(!token) {
            throw new ApiError(401 , "unAuothrize request ")
        }
    
        const data = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(data?._id)
        if(!user){
            throw new ApiError(401 , "Invalid Acess token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(500 , error.message )
    }
})

export {verifyJWT}