import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { ProductReducer } from "./Redux/Product/ProductReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    productState : ProductReducer
})

const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
    // rootReducer,
    // initialState,
    // composeEnhancers,
    // applyMiddleware(...middleware)
)

export default store;