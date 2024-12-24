//mongoose connection
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * Asynchronously connects to the MongoDB database using the connection
 * string specified in the environment variable MONGO_URI. Logs a success
 * message if the connection is successful, and logs an error message if
 * there is a failure during the connection attempt.
 */
const dbConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL); //connect to database
        console.log("MongoDB Connected"); //display success message
    } catch (error) {
        console.log(error); //display error message
    }
};

export default dbConfig;