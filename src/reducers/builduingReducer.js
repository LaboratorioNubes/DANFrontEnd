import { SET_BUILDINGS } from "../constants/buildings";

const initialState = {
    buildings: []
};

const buildingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUILDINGS:
          return {
            ...state,
            buildings: action.buildings
          };
    
        default:
          return state;
      }
}

export default buildingReducer;