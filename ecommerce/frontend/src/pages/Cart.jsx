import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { removeFromCart, updateCartQuantity } from '../redux/actions/productActions';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import './Cart.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(amount);
};

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.products.cart);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        showSuccessToast('Item removed from cart! 🗑️');
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateCartQuantity(productId, newQuantity));
    };

    const totalCartValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const orderResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalCartValue,
                    currency: 'INR',
                }),
            });

            if (!orderResponse.ok) {
                throw new Error("Failed to create order");
            }

            const order = await orderResponse.json();

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "ShopHub",
                description: "Complete your purchase",
                order_id: order.id,
                handler: async function (response) {
                    const verificationResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const result = await verificationResponse.json();
                    if (result.success) {
                        showSuccessToast("Payment successful! 🎉");
                    } else {
                        showErrorToast("Payment verification failed. Please contact support.");
                    }
                },
                notes: {
                    address: "ShopHub Store",
                },
                theme: {
                    color: "#667eea",
                },
            };
            
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Checkout error:", error);
            showErrorToast("An error occurred during checkout. Please try again.");
        }
    };

    return (
        <motion.div 
            className="cart-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <FaShoppingBag /> Your Shopping Cart
            </motion.h1>
            
            {cartItems.length === 0 ? (
                <motion.div 
                    className="empty-cart"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <p className="empty-cart-subtitle">Go add some amazing products!</p>
                </motion.div>
            ) : (
                <div className="cart-items-container">
                    <AnimatePresence>
                        {cartItems.map((item, index) => (
                            <motion.div 
                                key={item.id} 
                                className="cart-item"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                layout
                            >
                                <div className="cart-item-image-wrapper">
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
                                        alt={item.title}
                                        className="cart-item-image"
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <p className="cart-item-price">{formatCurrency(item.price)}</p>
                                    <div className="cart-item-quantity">
                                        <motion.button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaMinus />
                                        </motion.button>
                                        <span>{item.quantity}</span>
                                        <motion.button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaPlus />
                                        </motion.button>
                                    </div>
                                    <p className="cart-item-subtotal">
                                        Subtotal: {formatCurrency(item.price * item.quantity)}
                                    </p>
                                </div>
                                <motion.button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="remove-item-button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTrash />
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    <motion.div 
                        className="cart-summary"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(totalCartValue)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span className="free-shipping">FREE</span>
                        </div>
                        <div className="summary-total">
                            <span>Total:</span>
                            <span>{formatCurrency(totalCartValue)}</span>
                        </div>
                        <motion.button 
                            className="checkout-button" 
                            onClick={handleCheckout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Proceed to Checkout
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Cart;