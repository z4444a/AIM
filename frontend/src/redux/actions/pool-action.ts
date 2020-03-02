import { createAsyncAction } from 'typesafe-actions';
import { PoolAsync } from './action-types';
import { PoolGetModel } from '../../model/get/pool-get-model';
import { PoolUpdateModel } from '../../model/update/pool-update-model';
import { DeepPartial } from 'redux';

export const fetchPool = createAsyncAction(
  PoolAsync.GET,
  PoolAsync.GET_SUCCESS,
  PoolAsync.GET_FAILURE
)<number, PoolGetModel, Error>();

export const updatePool = createAsyncAction(
  PoolAsync.POOL_UPDATE,
  PoolAsync.POOL_UPDATE_SUCCESS,
  PoolAsync.POOL_UPDATE_FAILURE
)<DeepPartial<PoolUpdateModel>, PoolGetModel, Error>();
