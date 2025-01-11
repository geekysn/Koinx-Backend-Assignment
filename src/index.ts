import express, { Request, Response } from "express"
import dotenv from "dotenv"
import connectToMongo from "./config/config";
import { statsRouter } from "./routes/statsRouter";
import { deviationRouter } from "./routes/deviationRouter";
import cron from "node-cron";
import { fetchData } from "./services/getPrice";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongo();

// Task 2
app.use("/stats", statsRouter);

// Task 3
app.use("/deviation", deviationRouter);
app.use(express.json())

// Task 1

app.get("/", (req, res) => {
    res.send("Welcome! Please go to /stats to get the stats for a specific cryptocurrency or go to /deviation to get the standard deviation for a specific cryptocurrency.");
});

cron.schedule("0 */2 * * *", async ()=>{
    console.log("Running cron job every 2 hours")
    await fetchData();
})

app.listen(3000, async()=>{
    console.log("app is listening on port 3000")
})