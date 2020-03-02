import { ResourcePoolAsync } from './action-pool';
import { createAsyncAction } from 'typesafe-actions';
import ResourcePoolModel from '../../model/get/resource-pool-model';
import ResourcePoolParams from '../../commons/parameters/resource-pool-parameters';
import PageModel from '../../model/base/page-model';

export const fetchAllResourcePool = createAsyncAction(
  ResourcePoolAsync.REQUEST_POOL_ALL,
  ResourcePoolAsync.REQUEST_POOL_ALL_SUCCESS,
  ResourcePoolAsync.REQUEST_POOL_ALL_FAILURE
)<ResourcePoolParams | undefined, PageModel<ResourcePoolModel>, Error>();
