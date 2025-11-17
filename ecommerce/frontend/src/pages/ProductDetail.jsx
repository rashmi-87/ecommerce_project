import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaMinus, FaPlus } from 'react-icons/fa';
import { addToCart } from '../redux/actions/productActions';
import { showSuccessToast } from '../utils/toast';
import './ProductDetail.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(amount);
};

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const product = products.find((p) => p.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
    const imageUrl = product ? `${backendUrl}${product.image}` : "";

    useEffect(() => {
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        showSuccessToast(`${product.title} (x${quantity}) added to cart! 🛒`);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="star filled" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star filled" />);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
        }
        return stars;
    };

    if (!product) {
        return (
            <motion.div 
                className="not-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h2>Product not found</h2>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="product-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="detail-image-container"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.img 
                    src={imageUrl} 
                    alt={product.title} 
                    className="detail-image"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
            
            <motion.div 
                className="detail-info"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <span className="detail-category-badge">{product.category}</span>
                <h1>{product.title}</h1>
                
                <div className="detail-rating">
                    <div className="stars">
                        {renderStars(product.rating.rate)}
                    </div>
                    <span className="rating-text">
                        {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                </div>

                <p className="detail-price">{formatCurrency(product.price)}</p>
                
                <p className="detail-description">{product.description}</p>
                
                <div className="quantity-selector">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                        <motion.button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaMinus />
                        </motion.button>
                        <span className="quantity-value">{quantity}</span>
                        <motion.button 
                            onClick={() => setQuantity(quantity + 1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaPlus />
                        </motion.button>
                    </div>
                </div>

                <motion.button 
                    onClick={handleAddToCart} 
                    className="add-to-cart-button-detail"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaShoppingCart /> Add to Cart
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetail;