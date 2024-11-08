import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    products: {
        type: Array,
        default: [],
    },
    transactions: {
        type: Array,
        default: [],
    }
}, { minimize: false }); // Ensures empty arrays are saved to the document

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
