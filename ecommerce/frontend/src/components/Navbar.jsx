import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { showSuccessToast } from '../utils/toast';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useSelector((state) => state.products.cart);
    const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const currentUser = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const goToProducts = () => {
        setIsMenuOpen(false);
        if (location.pathname === '/') {
            const section = document.getElementById("product-list-section");
            if (section) section.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate('/', { state: { scrollToProducts: true } });
        }
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        showSuccessToast('Logged out successfully! 👋');
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <motion.nav 
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar-container">
                <motion.div 
                    className="navbar-brand"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RouterLink to="/" onClick={() => setIsMenuOpen(false)}>
                        <span className="brand-icon">🛍️</span>
                        ShopHub
                    </RouterLink>
                </motion.div>

                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <RouterLink to="/" onClick={() => setIsMenuOpen(false)}>Home</RouterLink>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <button onClick={goToProducts} className="nav-button">
                            Products
                        </button>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <RouterLink to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)}>
                            <FaShoppingCart />
                            <span>Cart</span>
                            {totalItemsInCart > 0 && (
                                <motion.span 
                                    className="cart-badge"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                >
                                    {totalItemsInCart}
                                </motion.span>
                            )}
                        </RouterLink>
                    </motion.li>

                    {currentUser ? (
                        <>
                            <motion.li 
                                className="user-greeting"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaUser /> {currentUser.name}
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <button onClick={handleLogout} className="nav-button logout-btn">
                                    Logout
                                </button>
                            </motion.li>
                        </>
                    ) : (
                        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <RouterLink to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>
                                <FaUser /> Login
                            </RouterLink>
                        </motion.li>
                    )}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;