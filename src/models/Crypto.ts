import mongoose, { Schema } from "mongoose";

export interface ICrypto extends Document {
    coinId: string;
    priceUsd: number;
    priceInr: number;
    marketcapUsd: number;
    marketcapInr: number;
    change24hUsd: number;
    change24hInr: number;
    timestamp: Date;
}

const CryptoSchema = new Schema({
    coinId: {
        type: String,
        required: true
    },
    priceUsd:{
        type: Number,
        required: true
    },
    priceInr:{
        type: Number,
        required: true
    },
    marketcapUsd:{
        type: Number,
        required: true
    },
    marketcapInr:{
        type: Number,
        required: true
    },
    change24hUsd:{
        type: Number,
        required: true
    },
    change24hInr:{
        type: Number,
        required: true
    },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<ICrypto>("Crypto", CryptoSchema);