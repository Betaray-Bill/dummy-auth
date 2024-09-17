import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import stateRoutes from './routes/stateRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors'
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

const corsOptions = {
    origin: ["http://localhost:5173"], //(https://your-client-app.com)
    optionsSuccessStatus: 200,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));



app.get('/', function(req, res){
    return res.send('hi')
})

app.use("/api/user", userRoutes)
app.use("/api/location", stateRoutes)

app.listen(process.env.PORT, () =>
    console.log(`Server running in 5000 mode on port ${process.env.PORT}`)
);