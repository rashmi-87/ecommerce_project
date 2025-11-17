import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../redux/actions/productActions';
import { showSuccessToast } from '../utils/toast';
import './ProductCard.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(amount);
};

const ProductCard = ({ product, index }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(product));
        showSuccessToast(`${product.title} added to cart! 🛒`);
    };

    const imageUrl = product.image?.startsWith('http')
        ? product.image
        : `${process.env.REACT_APP_BACKEND_URL}${product.image}`;

    return (
        <motion.div 
            className="product-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <Link to={`/products/${product.id}`} className="product-link">
                <div className="product-image-container">
                    <motion.img 
                        src={imageUrl} 
                        alt={product.title} 
                        className="product-image" 
                        onError={(e) => e.target.src = '/images/placeholder.png'}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <h3>{product.title}</h3>
                <p className="product-price">{formatCurrency(product.price)}</p>
            </Link>
            <motion.button 
                onClick={handleAddToCart} 
                className="add-to-cart-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaShoppingCart /> Add to Cart
            </motion.button>
        </motion.div>
    );
};

export default ProductCard;
