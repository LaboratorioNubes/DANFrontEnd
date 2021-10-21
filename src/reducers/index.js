import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import paymentReducer from './paymentReducer';
import buildingReducer from './builduingReducer';

const rootReducer = combineReducers({
    orders: orderReducer,
    buildings: buildingReducer,
    payments: paymentReducer,

});

export default rootReducer;