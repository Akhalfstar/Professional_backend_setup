import 'dotenv/config'

import dbConnect from "./dbs/index.js";
import { app } from './app.js';



dbConnect()
.then(()=>{
    
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log("server is running on port : " , process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Error after connecting DB : " , error)
})
