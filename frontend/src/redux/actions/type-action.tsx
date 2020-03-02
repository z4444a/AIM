import { createAsyncAction } from 'typesafe-actions';
import { ResourceTypeCreateAsync } from './action-types';
import { TypeCreateModel } from '../../model/create/type-create-model';
import { TypeGetModel } from '../../model/get/type-get-model';
import { TypeFormModel } from '../../model/form/type-form-model';

export const createType = createAsyncAction(
  ResourceTypeCreateAsync.TYPE_CREATE,
  ResourceTypeCreateAsync.TYPE_CREATE_SUCCESS,
  ResourceTypeCreateAsync.TYPE_CREATE_FAILURE
)<TypeCreateModel, TypeGetModel, Error>();

export const fetchType = createAsyncAction(
  ResourceTypeCreateAsync.GET_ALL,
  ResourceTypeCreateAsync.GET_SUCCESS,
  ResourceTypeCreateAsync.GET_FAILURE
)<number, TypeFormModel, Error>();
