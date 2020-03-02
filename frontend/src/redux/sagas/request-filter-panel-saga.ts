import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchResourceTypesSuggestions } from '../actions/request-filter-panel-actions';
import httpClientService from '../../commons/services/http-client.service';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';

export function* requestAllActiveResourceTypes(): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('resource-types/active')
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchResourceTypesSuggestions.success(data));
  } catch (error) {
    yield put(fetchResourceTypesSuggestions.failure(error));
  }
}

export function* watchRequestFilterPanelTypeSuggestion() {
  yield takeLatest(fetchResourceTypesSuggestions.request, requestAllActiveResourceTypes);
}
