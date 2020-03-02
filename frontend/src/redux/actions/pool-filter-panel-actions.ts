import { createAction, createAsyncAction } from 'typesafe-actions';
import { ResourceTypeSuggestion } from '../reducers/request-create-page-reducer';
import FullParameterModel from '../../model/get/full-parameter-model';
import { CustomFilterCmpContext } from '../../commons/components/aim-data-grid/aim-data-grid';

export const fetchResourceTypesSuggestions = createAsyncAction(
  'POOL_FILTER_PANEL/FETCH_RESOURCE_TYPES_SUGGESTIONS',
  'POOL_FILTER_PANEL/FETCH_RESOURCE_TYPES_SUGGESTIONS_SUCCESS',
  'POOL_FILTER_PANEL/FETCH_RESOURCE_TYPES_SUGGESTIONS_FAILURE'
)<void, ResourceTypeSuggestion[], Error>();

export const resetResourceTypeParameters = createAction(
  'POOL_FILTER_PANEL/RESET_RESOURCE_TYPE_PARAMETERS'
);

export const setResourceTypeParameters = createAction(
  'POOL_FILTER_PANEL/SET_RESOURCE_TYPE_PARAMETERS',
  action => (data: FullParameterModel[]) => action(data)
);

export const updatePoolsFilters = createAction('POOL_FILTER_PANEL/UPDATE_POOLS_FILTERS', action => {
  return (data: CustomFilterCmpContext) => action(data);
});

export const resetPoolsFilters = createAction('POOL_FILTER_PANEL/RESET_POOLS_FILTERS');
