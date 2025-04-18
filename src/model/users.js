import mongoose from "mongoose";

const EnergyRecordSchema = new mongoose.Schema({
    totalProduction: { type: Number, required: true },
    totalConsumption: { type: Number, required: true },
    avgProduction: { type: Number, required: true },
    avgConsumption: { type: Number, required: true },
    peakProduction: { type: Number, required: true },
    peakConsumption: { type: Number, required: true },
    efficiencyRatio: { type: Number, required: true },  // Efficiency = (totalProduction / totalConsumption)
    surplusEnergy: { type: Number, required: true },    // Surplus = totalProduction - totalConsumption (if > 0)
    energyDeficit: { type: Number, required: true },    // Deficit = totalConsumption - totalProduction (if > 0)
    timestamp: { type: String, require: true } // Store the timestamp for tracking records
});

// const profileSchema = new mongoose.Schema({
//     maxPrice: {
//         type: Number,
//         required: true
//     },
//     approxTokens: {
//         type: Number,
//         required: true
//     }
// }, { _id: false });
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
    buyerPreference: {
        demand: { type: Number, default: 0 },
        price: { type: Number, default: 0 }
    },
    transactions: {
        type: Array,
        default: [],
    },
    token: {
        type: Number,
        default: 0,
    },
    energyrecords: {
        type: [EnergyRecordSchema],
        default: []
    },


}, {
    // minimize: false,
    // strict: true // Ensure fields must be defined in schema
});


const User = mongoose.models.Userabhi || mongoose.model('Userabhi', userSchema);
export default User;
