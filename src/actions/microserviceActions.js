import { SET_ORDERS } from '../constants/order';
import { SET_PAYMENTS } from '../constants/payment'; 
import { SET_BUILDINGS } from '../constants/buildings'; 

  export const setOrders = (orders) => {
    return {
      type: SET_ORDERS,
      orders: orders,
    };
  };

  export const setBuildings = (buildings) => {
    return {
      type: SET_BUILDINGS,
      buildings: buildings,
    };
  };

  export const setPayments = (payments) => {
    return {
      type: SET_PAYMENTS,
      payments: payments,
    };
  };