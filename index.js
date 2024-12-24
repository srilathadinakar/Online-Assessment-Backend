import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dbConfig from "./Database/dbConfig.js";
import authRoute from "./Routes/authRoute.js";
import queRoute from "./Routes/queRoute.js";
import resultRoute from "./Routes/resultRoute.js";

import cron from "node-cron";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

cron.schedule('1,2,4,5 * * * *', () => {
  //console.log('running every minute 1, 2, 4 and 5');
});

dbConfig();

app.get("/", (req, res) => {
    res.send("Welcome to The Online Assesment Platform Backend");
});

app.use("/api/auth", authRoute);
app.use("/api/que", queRoute);
app.use("/api/result", resultRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});