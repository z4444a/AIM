import { ResourceTypeAsync, ResourceTypesActions } from './action-types';
import { createAction, createAsyncAction } from 'typesafe-actions';
import ResourceTypeModel from '../../model/get/resource-type-model';
import PageModel from '../../model/base/page-model';
import { ResourceTypesParams } from '../../model/parameters/resource-types-parameters';
import { TypeUpdateModel } from '../../model/update/type-update-model';
import { TypeGetModel } from '../../model/get/type-get-model';
import { DeepPartial } from 'redux';
import { ResourceTypeSuggestion } from '../reducers/resource-type-active-reducer';

export const fetchAllResourceTypes = createAsyncAction(
  ResourceTypeAsync.GET_ALL,
  ResourceTypeAsync.GET_ALL_SUCCESS,
  ResourceTypeAsync.GET_ALL_FAILURE
)<ResourceTypesParams | undefined, PageModel<ResourceTypeModel>, Error>();

export const fetchResourceType = createAsyncAction(
  ResourceTypeAsync.GET,
  ResourceTypeAsync.GET_SUCCESS,
  ResourceTypeAsync.GET_FAILURE
)<number, TypeGetModel, Error>();

export const updateResourceType = createAsyncAction(
  ResourceTypeAsync.UPDATE,
  ResourceTypeAsync.UPDATE_FAILURE,
  ResourceTypeAsync.UPDATE_SUCCESS
)<DeepPartial<TypeUpdateModel>, void, Error>();

export const fetchAllActiveResourceTypes = createAsyncAction(
  ResourceTypeAsync.REQUEST_ALL_ACTIVE,
  ResourceTypeAsync.REQUEST_ALL_ACTIVE_SUCCESS,
  ResourceTypeAsync.REQUEST_ALL_ACTIVE_FAILURE
)<void, ResourceTypeSuggestion[], Error>();

export const fetchResourceTypeSuggestions = createAsyncAction(
  ResourceTypeAsync.REQUEST_SUGGESTIONS,
  ResourceTypeAsync.REQUEST_SUGGESTIONS_SUCCES,
  ResourceTypeAsync.REQUEST_SUGGESTIONS_FAILURE
)<ResourceTypesParams | undefined, PageModel<ResourceTypeModel>, Error>();

export const clearResourceTypeSuggestions = createAction(ResourceTypesActions.CLEAR_SUGGESTIONS);
