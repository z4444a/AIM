import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import PageModel from '../../model/base/page-model';
import { fetchAllRequests, setRequestsPageFilterParam } from '../actions/request-actions';
import RequestModel from '../../model/get/request-model';
import { RequestParams } from '../../model/parameters/request-params';

interface StatePart {
  page: PageModel<RequestModel> | null;
  params: RequestParams;
}

const requestsReducer = (
  state: StatePart = {
    page: null,
    params: {
      pageSize: 10,
    },
  },
  action: RootAction
): StatePart => {
  switch (action.type) {
    case getType(setRequestsPageFilterParam):
      return {
        page: null,
        params: action.payload,
      };
    case getType(fetchAllRequests.request):
      return Object.assign({}, state, {
        params: action.payload,
      });
    case getType(fetchAllRequests.success):
      return Object.assign({}, state, {
        page: action.payload,
      });
    case getType(fetchAllRequests.failure):
    default:
      return state;
  }
};

export default requestsReducer;
