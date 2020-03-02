import { createAsyncAction } from 'typesafe-actions';
import { ResourceTypeCreateAsync } from './action-types';

export const checkTypeName = createAsyncAction(
  ResourceTypeCreateAsync.CHECK_NAME,
  ResourceTypeCreateAsync.CHECK_NAME_SUCCESS,
  ResourceTypeCreateAsync.CHECK_NAME_FAILURE
)<string, boolean, Error>();
