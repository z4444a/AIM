import { fetchAllResourcePool } from '../actions/resource-pool-actions';
import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import ResourcePoolModel from '../../model/get/resource-pool-model';
import PageModel from '../../model/base/page-model';
import ResourcePoolParameters from '../../commons/parameters/resource-pool-parameters';

interface StatePart {
  page: PageModel<ResourcePoolModel> | null;
  params: ResourcePoolParameters;
}

const resourcePoolReducer = (
  state: StatePart = {
    page: null,
    params: {
      pageSize: 10,
      onlyMine: true,
    },
  },
  action: RootAction
): StatePart => {
  switch (action.type) {
    case getType(fetchAllResourcePool.request):
      return Object.assign({}, state, {
        params: action.payload,
      });
    case getType(fetchAllResourcePool.success):
      return Object.assign({}, state, {
        page: action.payload,
      });
    case getType(fetchAllResourcePool.failure):
    default:
      return state;
  }
};

export default resourcePoolReducer;
