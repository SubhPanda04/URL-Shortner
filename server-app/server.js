import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import {nanoid} from 'nanoid';
import  dotenv from 'dotenv'
import QRCode from "qrcode";

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.VITE_API_URL,
    credentials: true
  }));  
app.use(express.json());

const url = process.env.VITE_API_URL || "http://localhost:5000";
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloaded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);


//Database Connection

mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("Database connected successfully"))
    .catch((err)=> console.log("Failed to connect database",err));

const urlSchema = new mongoose.Schema({
    fullUrl: String,
    shortUrl: String,
    clicks: {type:Number, default: 0},
});

const Url = mongoose.model('Url', urlSchema);

app.post("/api/short", async (req,res) => {
    try {
        const {fullUrl} = req.body;
        if(!fullUrl) return res.status(500).json({error: 'fullUrl error'});
        const shortUrl = nanoid(10);
        const url = new Url({fullUrl,shortUrl});
        const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
        const myUrl = `${baseUrl}/${shortUrl}`;
        const qrCodeImg = await QRCode.toDataURL(myUrl)
        await url.save();
        return res.status(200).json({message: "URL Generated", shortUrl: myUrl, qrCodeImg})
    }catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error'});
    }
});

app.get("/:shortUrl", async (req,res)=> {
    try {
        const {shortUrl} = req.params;
        const url = await Url.findOne({shortUrl});
        if(url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.fullUrl)
        }else {
           return res.status(404).json({error: "Url Not Found"}); 
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server error'});
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
   console.log(`Server is running on port ${PORT}`) 
})