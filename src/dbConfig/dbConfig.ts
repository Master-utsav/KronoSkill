import mongoose from "mongoose"; 

export async function connect() {
    try {
        mongoose.connect(process.env.NEXT_PRIVATE_MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("mongoDB connected");
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error , please make sure db is up and running : ' + err);
            process.exit()
        })
    }
    catch (error) {
        console.log('Somethimg went wrong in connecting to DB');
        console.log(error);
    }
}