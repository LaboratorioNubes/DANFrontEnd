import { SET_ORDERS } from "../constants/order";

const initialState = {
    orders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
          return {
            ...state,
            orders: action.orders
          };
    
        default:
          return state;
      }
}

export default orderReducer;