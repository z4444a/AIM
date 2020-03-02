import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAllResourcePool } from '../actions/resource-pool-actions';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import httpClientService from '../../commons/services/http-client.service';
import ResourcePoolModel from '../../model/get/resource-pool-model';

export function* requestAllResourcePools(
  action: ReturnType<typeof fetchAllResourcePool.request>
): SagaIterator {
  try {
    const data = yield call(() =>
      httpClientService
        .get('pools', {
          params: action.payload,
        })
        .then((response: AxiosResponse) => response.data)
    );
    data.content.map(
      (item: ResourcePoolModel) =>
        (item.capacity = item.resourceType.quantitative
          ? item.currentCapacity + ' (' + item.totalCapacity + ')'
          : '')
    );
    yield put(fetchAllResourcePool.success(data));
  } catch (error) {
    yield put(fetchAllResourcePool.failure(error));
  }
}

export function* watchFetchAllResourcePool() {
  yield takeLatest(fetchAllResourcePool.request, requestAllResourcePools);
}
