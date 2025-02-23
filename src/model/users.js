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
    },
    token: {
        type: Number,
        default: 0,
    }
}, { minimize: false }); // Ensures empty arrays are saved to the document



const User = mongoose.models.Userabhi || mongoose.model('Userabhi', userSchema);
export default User;
