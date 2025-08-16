import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Find all documents in the 'products' collection
    const products = await Product.find();

    // Check if any products were found
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Send the products back as a JSON response
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
