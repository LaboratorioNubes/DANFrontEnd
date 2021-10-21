import { SET_PAYMENTS } from "../constants/payment";

const initialState = {
    payments: []
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYMENTS:
          return {
            ...state,
            payments: action.payments
          };
    
        default:
          return state;
      }
}

export default paymentReducer;