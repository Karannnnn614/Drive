import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        // trim: true,
        minlength: 3, 
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true,
        lowercase: true,
        minlength: 13,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength: 5,
    },
}, {
    // timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
