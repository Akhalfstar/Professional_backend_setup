import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookie())

// routes
import userRouter from "./routes/user.routs.js"

app.use('/api/v1/users' , userRouter)
console.log("App is running")
app.get('/' , (req ,res) => {
    res.send("hello")
})



export {app}