import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const cartItems = useSelector((state) => state.products.cart);
    const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const currentUser = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const goToProducts = () => {
        if (location.pathname === '/') {
            const section = document.getElementById("product-list-section");
            if (section) section.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate('/', { state: { scrollToProducts: true } });
        }
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        alert('Logged out successfully!');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <RouterLink to="/">E-commerce Store</RouterLink>
            </div>
            <ul className="navbar-links">
                <li><RouterLink to="/">Home</RouterLink></li>
                <li>
                    <button
                        onClick={goToProducts}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
                    >
                        Products
                    </button>
                </li>
                <li><RouterLink to="/cart">Cart ({totalItemsInCart})</RouterLink></li>

                {currentUser ? (
                    <>
                        <li style={{ fontWeight: 'bold', color: '#4caf50' }}>
                            Hello, {currentUser.name} 👋
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li><RouterLink to="/login">Login/Signup</RouterLink></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;