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
    },
    energyrecords: {
        type: [EnergyRecordSchema],
        default: [] // Explicitly set default value
    }
}, {
    minimize: false,
    strict: true // Ensure fields must be defined in schema
});


const User = mongoose.models.Userabhi || mongoose.model('Userabhi', userSchema);
export default User;
