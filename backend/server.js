import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';
dotenv.config();

// CONNECT DB ------------------------------
const connectDB = async() =>{    
    var uri = "mongodb://surya:80kVlt5XpdiHhEvt@cluster0-shard-00-00.3huyd.mongodb.net:27017,cluster0-shard-00-01.3huyd.mongodb.net:27017,cluster0-shard-00-02.3huyd.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nqjjc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);
    console.log("asdA ",mongoose.connection.host,mongoose.connection.port)
}
connectDB()
// ------------------------------

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', function(req, res){
    return res.send('hi')
})

app.use("/api/user", userRoutes)

app.listen(process.env.PORT, () =>
    console.log(`Server running in 5000 mode on port ${process.env.PORT}`)
);