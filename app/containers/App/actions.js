/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  ON_LOAD_ACTION,
  LOAD_SUCCESS_ACTION,
  LOAD_ERROR_ACTION,
} from './constants';

export function actionOnLoad() {
  return {
    type: ON_LOAD_ACTION,
  };
}

export function actionLoadSuccess() {
  return {
    type: LOAD_SUCCESS_ACTION,
  };
}

export function actionLoadError(error) {
  return {
    type: LOAD_ERROR_ACTION,
    error,
  };
}
