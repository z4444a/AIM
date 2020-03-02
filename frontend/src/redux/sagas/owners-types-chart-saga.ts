import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchOwnersTypesChart } from '../actions/owners-types-chart';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';
import httpClientService from '../../commons/services/http-client.service';

export function* requestOwnersTypesChart(
  action: ReturnType<typeof fetchOwnersTypesChart.request>
): SagaIterator {
  try {
    let owners: string;
    action.payload.owners.forEach(item => {
      owners = (owners ? owners + ',' : '') + item;
    });
    let resourceTypes: string;
    action.payload.resourceTypes.forEach(item => {
      resourceTypes = (resourceTypes ? resourceTypes + ',' : '') + item;
    });
    const data = yield call(() =>
      httpClientService
        .get('pools/chart', {
          params: { owners: owners, resourceTypes: resourceTypes },
        })
        .then((response: AxiosResponse) => response.data)
    );

    yield put(fetchOwnersTypesChart.success(data));
  } catch (error) {
    put(fetchOwnersTypesChart.failure(error));
  }
}

export function* watchFetchOwnersTypesChart() {
  yield takeLatest(fetchOwnersTypesChart.request, requestOwnersTypesChart);
}
