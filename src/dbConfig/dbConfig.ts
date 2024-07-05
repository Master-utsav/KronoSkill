import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.NEXT_PRIVATE_MONGO_URL!);
        const connection = mongoose.connection;

        // Set maximum listeners for connected and error events
        connection.setMaxListeners(15); // Adjust the number as per your needs
       
        connection.on('connected', () => {
            console.log("MongoDB connected");
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1); // Exit process on connection error
        });
    }
    catch (error) {
        console.error('Something went wrong in connecting to DB:');
        console.error(error);
        process.exit(1); // Exit process on DB connection error
    }
}
