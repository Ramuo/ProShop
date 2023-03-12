import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import {errorHandler, notFound} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

// Connect to the database
connectDB();

// Initialize de express app
const app = express();

//Set up the body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// ROUTES:
app.get('/', (req, res) => {
    res.send('API is running....')
});
// Products route
app.use('/api/products', productRoutes);
//User route
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 5000;


//Middleware Error Handler
app.use(notFound);
app.use(errorHandler);


// Set up the server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));