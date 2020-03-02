import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { fetchProjectPage } from '../actions/project-actions';
import httpClientService from '../../commons/services/http-client.service';

export function* requestProjectPage(
  action: ReturnType<typeof fetchProjectPage.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('projects', {
          params: action.payload,
        })
        .then((response: AxiosResponse) => response.data)
    );
    yield put(fetchProjectPage.success(data));
  } catch (error) {
    put(fetchProjectPage.failure(error));
  }
}

export function* watchFetchProjectPage() {
  yield takeLatest(fetchProjectPage.request, requestProjectPage);
}
