import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SORT_CATEGORY = 'SET_SORT_CATEGORY';

export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const res = await axios.get('http://localhost:3001/api/products');
        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: err.message,
        });
    }
};

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateCartQuantity = (productId, quantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { productId, quantity },
});

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term,
});

export const setSortCategory = (category) => ({
    type: SET_SORT_CATEGORY,
    payload: category,
});