import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.get('/', (req, res) => {
    res.send('Hello, World!');  
});


export default app; // Export the app for testing or further configuration