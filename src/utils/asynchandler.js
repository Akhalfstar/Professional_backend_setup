import { json } from "express"

const asynchandler = (fn) =>{
    return (req, res, next) => {
        return Promise.resolve(fn(req , res , next)).catch((error)=>next(error))
    }
}

const ash2 = (fn) => async (req , res , next)=> {
    try {
        
    } catch (error) {
        res.status(error.code || 500)
        .json({
            success :false,
            message : error.message
        })
    }
}

export {asynchandler , ash2}