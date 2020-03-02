import { fetchAllResourceTypes } from '../actions/resource-type-actions';
import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import ResourceTypeModel from '../../model/get/resource-type-model';
import PageModel from '../../model/base/page-model';
import { ResourceTypesParams } from '../../model/parameters/resource-types-parameters';

interface StatePart {
  page: PageModel<ResourceTypeModel> | null;
  params: ResourceTypesParams;
}

const resourceTypesReducer = (
  state: StatePart = {
    page: null,
    params: {
      pageSize: 10,
    },
  },
  action: RootAction
): StatePart => {
  switch (action.type) {
    case getType(fetchAllResourceTypes.request):
      return Object.assign({}, state, {
        params: action.payload,
      });
    case getType(fetchAllResourceTypes.success):
      return Object.assign({}, state, {
        page: action.payload,
      });
    case getType(fetchAllResourceTypes.failure):
    default:
      return state;
  }
};

export default resourceTypesReducer;
