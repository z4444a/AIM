import { createAction, createAsyncAction } from 'typesafe-actions';
import { ResourceTypeSuggestion } from '../reducers/request-create-page-reducer';
import FullParameterModel from '../../model/get/full-parameter-model';
import { CustomFilterCmpContext } from '../../commons/components/aim-data-grid/aim-data-grid';

export const fetchResourceTypesSuggestions = createAsyncAction(
  'REQUEST_FILTER_PANEL/FETCH_RESOURCE_TYPES_SUGGESTIONS',
  'REQUEST_FILTER_PANEL/FETCH_RESOURCE_TYPES_SUGGESTIONS_SUCCESS',
  'REQUEST_FILTER_PANEL/FETCH_RESOURCE_TYPES_SUGGESTIONS_FAILURE'
)<void, ResourceTypeSuggestion[], Error>();

export const resetResourceTypeParameters = createAction(
  'REQUEST_FILTER_PANEL/RESET_RESOURCE_TYPE_PARAMETERS'
);

export const setResourceTypeParameters = createAction(
  'REQUEST_FILTER_PANEL/SET_RESOURCE_TYPE_PARAMETERS',
  action => (data: FullParameterModel[]) => action(data)
);

export const updateRequestFilters = createAction(
  'REQUEST_FILTER_PANEL/UPDATE_REQUEST_FILTERS',
  action => {
    return (data: CustomFilterCmpContext) => action(data);
  }
);

export const resetRequestFilters = createAction('REQUEST_FILTER_PANEL/RESET_REQUEST_FILTERS');
