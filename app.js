import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRouters from './routes/usersRoutes.js';
import ticketRouters from './routes/ticketsRoutes.js';

const app = express();
const DB_URL = process.env.NODE_ENV === "test"
? 'mongodb://localhost:27017/ticketing-db-test'
: process.env.DB_URL || 'mongodb://localhost:27017/ticketing-db';

mongoose
.connect(DB_URL)
.then(() => {console.log(`Connected to MongoDB: ${DB_URL}`);})
.catch((err) => {console.error(`Failed to connect to MongoDB: ${err.message}`);});

app.use(morgan('dev')); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.get('/', (req, res) => {
    res.send('Hello, World!');  
});

app.use('/api/users', userRouters); // User routes
app.use('/api/tickets', ticketRouters); // Ticket routes

export default app; // Export the app for testing or further configuration