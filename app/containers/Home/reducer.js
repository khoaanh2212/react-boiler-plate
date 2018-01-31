/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_QR_CODE_ACTION,
} from './constants';

const initialState = fromJS({});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QR_CODE_ACTION:
      return state;
    default:
      return state;
  }
}

export default homeReducer;
