import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../redux/actions/productActions';
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
                name: "E-Commerce Store",
                description: "Test Transaction",
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
                        alert("Payment successful!");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };
            
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred during checkout. Please try again.");
        }
    };


    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Go add some products!</p>
            ) : (
                <div className="cart-items-container">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
                                alt={item.title}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <p>{formatCurrency(item.price)}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="remove-item-button"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h2>Total: {formatCurrency(totalCartValue)}</h2>
                            <button className="checkout-button" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;