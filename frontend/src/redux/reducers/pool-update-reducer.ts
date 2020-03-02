import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import { updatePool } from '../actions/pool-action';
import { Errors } from '../../model/form/pool-form-model';

const poolUpdateReducer = (state: Errors | null = null, action: RootAction): Errors | null => {
  switch (action.type) {
    case getType(updatePool.request):
      return { id: state ? state.id : 0, error: false };
    case getType(updatePool.success):
      return { id: action.payload ? action.payload.id : 0, error: false };
    case getType(updatePool.failure):
      return { id: state ? state.id : 0, error: true };
    default:
      return { id: state ? state.id : 0, error: false };
  }
};

export default poolUpdateReducer;
