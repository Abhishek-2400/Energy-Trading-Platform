import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    meterId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userabhi',
        required: true
    },
    avgProduction: {
        type: Number
    },
    avgConsumption: {
        type: Number
    },
    minBalance: {
        type: Number
    },
    maxBalance: {
        type: Number
    },
    tokenCount: {
        type: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Analysis = mongoose.model('meterAnalysis', analysisSchema);
export default Analysis;