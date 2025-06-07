import mongoose from "mongoose";

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Successfully connected to MongoDB");
    }).catch(err => {
        console.log("Error while connecting to MongoDB" + err);
    })
}

export default connectToDB;