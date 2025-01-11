import { Router } from "express";
import { deviationSchema } from "../validations/cryptoSchema";
import Crypto from "../models/Crypto";

const router = Router();

function calculateDeviation(prices: number[]):number{
    const n = prices.length;
    const mean = prices.reduce((sum, price)=> sum+price, 0)/n;
    const squaredDiff = prices.map(price=>Math.pow(price-mean,2));
    const variance = squaredDiff.reduce((sum, diff)=> sum+diff, 0)/n;
    return Math.sqrt(variance);
}

router.get("/", async(req, res)=>{
    try{
        const deviRes = deviationSchema.safeParse(req.query);

        if(!deviRes.success){
            res.status(400).json({
                error: "Deviation Validation failed",
                details: deviRes.error.issues
            })
        }

        const { coin, currency } = deviRes.data!;

        const last100Records = await Crypto.find({ coinId: coin }).sort({timestamp: -1}).limit(100).select(currency === 'inr' ? 'priceInr' : 'priceUsd');

        if(last100Records.length == 0){
            res.status(404).json({
                error: 'No data found for the specified coin'
            })
            return;
        }
        console.log(last100Records)

        const prices = last100Records.map(record=> currency === 'inr' ? record.priceInr : record.priceUsd);

        const deviation = calculateDeviation(prices);

        res.json({
            deviation: parseFloat(deviation.toFixed(3))
        })
    }
    catch(e){
        console.log("Error in deviation route ", e);
        res.status(500).json({ error: 'Internal server error' });
    }
})
export const deviationRouter = router;