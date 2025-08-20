import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchTerm, setSortCategory } from '../redux/actions/productActions';
import ProductCard from '../components/ProductCard';
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

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="welcome-message">
                    <h1>Welcome to Our E-commerce Store!</h1>
                    <p>Discover amazing products at unbeatable prices.</p>
                    <p>Start exploring our diverse collection now.</p>
                    <button className="shop-now-button" onClick={handleShopNowClick}>
                        Shop Now
                    </button>
                </div>
                <div className="hero-image">
                    <img src={`${process.env.REACT_APP_API_URL}/images/welcome.jpg`} alt="Welcome" />
                </div>
            </div>

            <div className="product-filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select onChange={handleSortChange} value={sortCategory}>
                    <option value="all">All Categories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                </select>
            </div>

            <h2>Our Products</h2>
            <div id="product-list-section" className="product-list">
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div>No products found.</div>
                )}
            </div>
        </div>
    );
};

export default Home;
