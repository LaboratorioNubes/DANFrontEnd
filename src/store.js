import {createStore} from "redux";
import rootReducer from "./reducers";

/* const initialState = {
    orders: []
};

function orderReducer (state = initialState, action) {
    return state;
} */

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());