import { Router } from "express";
import { statsSchema } from "../validations/cryptoSchema";
import Crypto from "../models/Crypto";

const router = Router();

router.get("/", async(req, res)=>{
    try{
        const statRes = statsSchema.safeParse(req.query);

        if(!statRes.success){
            res.status(400).json({
                error:"Validation failed in stats router",
                details: statRes.error.issues
            })
            return;
        }

        const { coin, currency } = statRes.data!;
        const cryptoData = await Crypto.findOne({coinId: coin}).sort({timestamp: -1});

        if(!cryptoData){
            res.status(404).json({
                message: "No data found for the specified coin"
            })
            return;
        }

        const response = {
            price: currency === 'usd' ? cryptoData.priceUsd : cryptoData.priceInr,
            marketCap: currency === 'usd' ? cryptoData.marketcapUsd : cryptoData.marketcapInr,
            "24hChange": currency === 'usd' ? cryptoData.change24hUsd : cryptoData.change24hInr
        }

        res.json(response);
    }
    catch(e){
        console.error('Error fetching stats:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export const statsRouter = router;