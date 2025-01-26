import mongoose from "mongoose";

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    });
}

export default connectToDB;
