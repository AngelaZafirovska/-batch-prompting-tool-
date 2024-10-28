// reducer.js
import { SAVE_INPUT_DATA, GET_INPUT_DATA } from './actionType.js';

const initialState = {
  inputData: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_INPUT_DATA:
        state.inputData = action.payload;
      return { ...state, inputData: action.payload };
    case GET_INPUT_DATA:
      return state;
    default:
      return state;
  }
};

export default dataReducer;
