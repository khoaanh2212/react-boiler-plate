/*
 *
 * Home actions
 *
 */

import {
  GET_QR_CODE_ACTION,
} from './constants';

export function actionGetQRCode(data) {
  return {
    type: GET_QR_CODE_ACTION,
    data,
  };
}
