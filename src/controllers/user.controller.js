import { asynchandler } from "../utils/asynchandler.js"

const registerUser = asynchandler( async (req , res) => {
    res.status(200).json({
        message : " user registred"
    })
})

export {registerUser}