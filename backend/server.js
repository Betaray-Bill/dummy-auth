import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import userRoutes from './routes/userRoutes.js';
// import stateRoutes from './routes/stateRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors'
dotenv.config();

// CONNECT DB ------------------------------
const connectDB = async() => {
    var uri = "mongodb://surya:80kVlt5XpdiHhEvt@cluster0-shard-00-00.3huyd.mongodb.net:27017,cluster0-shard-00-01.3huyd.mongodb.net:27017,cluster0-shard-00-02.3huyd.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nqjjc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);
    console.log("asdA ", mongoose.connection.host, mongoose.connection.port)
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
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// import mongoose from 'mongoose';
// import BaseUserSchema from './baseUserModel.js';

const options = { discriminatorKey: 'kind' };

const eventSchema = new mongoose.Schema({ time: Date }, options);
const Event = mongoose.model('Event', eventSchema);
const userData = Event.discriminator("user", new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    // Add other fields specific to user data
}), options)


// ClickedLinkEvent is a special type of Event that has
// a URL.
const ClickedLinkEvent = Event.discriminator('ClickedLink',
    new mongoose.Schema({ url: String }, options));

// When you create a generic event, it can't have a URL field...
const genericEvent = new Event({ time: Date.now(), url: 'google.com' });
// assert.ok(!genericEvent.url);

// But a ClickedLinkEvent can
const clickedEvent = new ClickedLinkEvent({ time: Date.now(), url: 'google.com' });
// assert.ok(clickedEvent.url);

const user1 = new userData({
    name: "Syrya",
    age: 12,
    email: "syrya@gmail.com",
    // Add other fields specific to user data
})
await user1.save()
    // const event1 = new Event({ time: Date.now() });
    // const event2 = new ClickedLinkEvent({ time: Date.now(), url: 'google.com' });
    // const event3 = new SignedUpEvent({ time: Date.now(), user: 'testuser' });


// await Promise.all([event1.save(), event2.save()]);
const count = await Event.countDocuments();
console.log("count", count);
// assert.equal(count, 3);

const e = await Event.find({})
console.log("Add Events ", e);
app.get('/', function(req, res) {
    return res.send('hi')
})

// app.use("/api/user", userRoutes)
// app.use("/api/location", stateRoutes)

app.listen(6000, () =>
    console.log(`Server running in 5000 mode on port 6000`)
);