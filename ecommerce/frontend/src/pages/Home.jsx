import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaRocket } from 'react-icons/fa';
import { fetchProducts, setSearchTerm, setSortCategory } from '../redux/actions/productActions';
import ProductCard from '../components/ProductCard.jsx';
import { useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { products, loading, error, searchTerm, sortCategory } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (location.state?.scrollToProducts) {
            const section = document.getElementById("product-list-section");
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: "smooth" });
                }, 200); 
            }
        }
    }, [location]);

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleSortChange = (e) => {
        dispatch(setSortCategory(e.target.value));
    };

    const handleShopNowClick = () => {
        const section = document.getElementById("product-list-section");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const filteredAndSortedProducts = products
        .filter(product =>
            (product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product?.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (sortCategory === 'all' || product?.category?.toLowerCase() === sortCategory.toLowerCase())
        );

    if (loading) return (
        <div className="loading-container">
            <motion.div 
                className="loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p>Loading amazing products...</p>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <p>⚠️ Error: {error}</p>
        </div>
    );

    return (
        <div className="home-page">
            <motion.div 
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-background">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                    <div className="floating-shape shape-4"></div>
                    <div className="floating-shape shape-5"></div>
                    <div className="sparkle sparkle-1"></div>
                    <div className="sparkle sparkle-2"></div>
                    <div className="sparkle sparkle-3"></div>
                    <div className="sparkle sparkle-4"></div>
                </div>
                
                <motion.div 
                    className="welcome-message"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1>
                        <span className="gradient-text">Welcome to</span>
                        <br />
                        <span className="brand-text">ShopHub</span>
                    </h1>
                    <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
                    <p className="hero-description">Start exploring our diverse collection now</p>
                    <motion.button 
                        className="shop-now-button" 
                        onClick={handleShopNowClick}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaRocket /> Shop Now
                    </motion.button>
                </motion.div>
                
                <motion.div 
                    className="hero-image"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="hero-image-wrapper">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/images/welcome.jpg`} alt="Welcome" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div 
                className="product-filters"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="filter-box">
                    <FaFilter className="filter-icon" />
                    <select onChange={handleSortChange} value={sortCategory}>
                        <option value="all">All Categories</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </div>
            </motion.div>

            <motion.h2 
                className="section-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                Our Products
            </motion.h2>
            
            <div id="product-list-section" className="product-list">
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))
                ) : (
                    <motion.div 
                        className="no-products"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p>No products found. Try adjusting your filters!</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;
