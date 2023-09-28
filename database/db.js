import mongoose from "mongoose"

const options = {
    useUnifiedTopology: true,
  
  };
const Connection = async () => {
    const DB_URI = process.env.DB_URI

    try {
        await mongoose.connect(DB_URI, options)
        console.log("Database Connected")
    }
    catch(error) {
        console.log('Error while connecting the database ', error)
    }
}

export default Connection