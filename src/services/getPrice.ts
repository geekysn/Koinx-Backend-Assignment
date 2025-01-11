import axios from "axios";
import Crypto from "../models/Crypto"

const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const COINS = ['bitcoin', 'ethereum', 'matic-network'];
const PARAMS = 'vs_currencies=usd%2Cinr&include_market_cap=true&include_24hr_change=true';

export const fetchData = async ()=>{
    try{
        console.log(`${COINGECKO_API}?ids=${COINS.join('%2C')}&${PARAMS}`)
        const res = await axios.get(`${COINGECKO_API}?ids=${COINS.join('%2C')}&${PARAMS}`,{
            headers:{
                Accept: 'application/json',
                "x-cg-demo-api-key": process.env.key
            }
        })
    
        const data = res.data;
        // console.log("data is ",data)
        for(const coin of COINS){
            const coinData = data[coin];
            // console.log("coindata  is ", coinData);
            const cryptoData = new Crypto({
                coinId: coin,
                priceUsd: coinData.usd,
                priceInr: coinData.inr,
                marketcapUsd: coinData.usd_market_cap,
                marketcapInr: coinData.inr_market_cap,
                change24hUsd: coinData.usd_24h_change,
                change24hInr: coinData.inr_24h_change,
            })
    
            await cryptoData.save();
            console.log(`Data saved for ${coin}`);
        }
    }
    catch(e){
        console.log("Error while fetching data", e);
    }
}