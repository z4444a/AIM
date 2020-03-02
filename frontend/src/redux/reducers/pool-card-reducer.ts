import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import { PoolGetModel } from '../../model/get/pool-get-model';
import { fetchPool } from '../actions/pool-action';

const poolCardReducer = (
  state: PoolGetModel | null = null,
  action: RootAction
): PoolGetModel | null => {
  switch (action.type) {
    case getType(fetchPool.request):
      return state;
    case getType(fetchPool.success):
      return action.payload;
    case getType(fetchPool.failure):
    default:
      return state;
  }
};

export default poolCardReducer;
