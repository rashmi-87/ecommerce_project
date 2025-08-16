import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    SET_SEARCH_TERM,
    SET_SORT_CATEGORY,
} from '../actions/productActions';

const initialState = {
    products: [],
    cart: [],
    loading: false,
    error: null,
    searchTerm: '',
    sortCategory: 'all', // 'all', 'men\'s clothing', 'women\'s clothing', 'jewelery', 'electronics'
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TO_CART:
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }],
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            };
        case SET_SORT_CATEGORY:
            return {
                ...state,
                sortCategory: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;