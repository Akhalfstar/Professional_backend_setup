import mongoose from 'mongoose'


const dbConnect = async () =>{
    try {
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log("DB connected to : " , connectionInstant.connection.host)
    } catch (error) {
        console.error("Mongoose connection failed error : " , error)
        process.exit(1)
    }
}


export default dbConnect