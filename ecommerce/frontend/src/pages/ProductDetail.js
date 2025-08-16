import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/productActions';
import './ProductDetail.css';

// helper function to format currency as Indian Rupees
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

    // Get backend URL from env
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
    const imageUrl = product ? `${backendUrl}${product.image}` : "";

    useEffect(() => {
        // fetching a single product if it's not already in the store
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        alert(`${product.title} (x${quantity}) added to cart!`);
    };

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="detail-image-container">
                <img src={imageUrl} alt={product.title} className="detail-image" />
            </div>
            <div className="detail-info">
                <h1>{product.title}</h1>
                <p className="detail-price">{formatCurrency(product.price)}</p>
                <p className="detail-category">Category: {product.category}</p>
                <p className="detail-description">{product.description}</p>
                <div className="detail-rating">
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                </div>
                <div className="quantity-selector">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-button-detail">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetail;