import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectionToDB = async () =>{
    try {
        const { connection} = await mongoose.connect(
            process.env.MONGODB_URL || 'mongodb+srv://root:root@cluster0.bfppb5n.mongodb.net/lms/user'
        )
        if(connection) {
            console.log(`Connected to MongoDB ${connection.host}`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}
export default connectionToDB;