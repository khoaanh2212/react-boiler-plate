/*
 *
 * Home actions
 *
 */

import {
  GET_QR_CODE_ACTION,
} from './constants';

export function actionGetQRCode(data, resolve, reject) {
  return {
    type: GET_QR_CODE_ACTION,
    data,
    resolve,
    reject,
  };
}
