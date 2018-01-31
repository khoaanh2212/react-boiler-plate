import { take, call, put, takeLatest, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { resetLoading } from 'react-redux-loading-bar';


import request, { getOptions } from 'utils/request';
import config from 'config';
import { convertObjectToParamUrl } from 'utils/common';

import { actionOnLoad, actionLoadSuccess, actionLoadError } from 'containers/App/actions';

import {
  GET_QR_CODE_ACTION,
} from './constants';
import {} from './actions';

export function* getQRCode(action) {
  const { data } = action;
  const strParam = convertObjectToParamUrl(data, true);
  try {
    yield put(actionOnLoad());
    const url = `${config.api.url}/qrcodes${strParam}`;
    const options = getOptions();
    const result = yield call(request, url, options); //eslint-disable-line
    yield put(actionLoadSuccess());
  } catch (err) {
    if (err.response) {
      const errResp = yield err.response.json();
      const errCode = errResp.statusCode ? errResp.statusCode : err.message;
      yield put(actionLoadError(errCode));
    }
  }
}


export function* homeSaga() {
  const watcherGetQRCode = yield takeLatest(GET_QR_CODE_ACTION, getQRCode);

  const watchers = [
    watcherGetQRCode,
  ];
  yield take(LOCATION_CHANGE);
  yield watchers.map((watcher) => cancel(watcher));
  yield put(resetLoading());
}

// All sagas to be loaded
export default [
  homeSaga,
];
