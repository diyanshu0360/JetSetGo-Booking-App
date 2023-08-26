import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json()); // for sending JSON requests
app.use(cookieParser());

app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

// MongoDB Connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to MongoDB!')
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('disconnected to mongoDB!');
})

// Backend server Connection
app.listen(8080, ()=>{
    connect()
    console.log('connected to backed server!')
})