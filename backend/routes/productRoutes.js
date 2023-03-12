import express from 'express';
import {
    getProducts, 
    getProductById
} from '../controllers/productController.js'



// Initialize router
const router = express.Router();


//ROUTES:
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router;



