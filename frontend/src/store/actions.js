// actions.js
import { SAVE_INPUT_DATA, GET_INPUT_DATA } from './actionType.js';

export const saveInputData = (data) => ({
  type: SAVE_INPUT_DATA,
  payload: data,
});
export const getInputData = () => ({
  type: GET_INPUT_DATA,
});
