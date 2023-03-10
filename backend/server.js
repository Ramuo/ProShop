import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import {errorHandler, notFound} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js';

dotenv.config();

// Connect to the database
connectDB();

// Initialize de express app
const app = express();


// Routes
app.get('/', (req, res) => {
    res.send('API is running....')
});

app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;


//Middleware Error Handler
app.use(notFound);
app.use(errorHandler);


// Set up the server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));