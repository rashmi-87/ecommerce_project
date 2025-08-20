import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/productActions';
import './ProductCard.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(amount);
};

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        alert(`${product.title} added to cart!`);
    };

    const imageUrl = product.image?.startsWith('http')
        ? product.image
        : `${process.env.REACT_APP_BACKEND_URL}${product.image}`;

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`} className="product-link">
                <img 
                    src={imageUrl} 
                    alt={product.title} 
                    className="product-image" 
                    onError={(e) => e.target.src = '/images/placeholder.png'}
                />
                <h3>{product.title}</h3>
               <p className="product-price">{formatCurrency(product.price)}</p>
            </Link>
            <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
