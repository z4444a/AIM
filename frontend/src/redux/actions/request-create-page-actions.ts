import { createAction, createAsyncAction } from 'typesafe-actions';
import { ResourceTypeSuggestion } from '../reducers/request-create-page-reducer';
import FullParameterModel from '../../model/get/full-parameter-model';
import { CreateRequestFormModel } from '../../modules/requests/components/request-create-form/request-create-form';
import { CreateRequestDto } from '../../model/create/create-request-dto';
import NamedModel from '../../model/base/named-model';

export const fetchResourceTypesSuggestions = createAsyncAction(
  'REQUEST_CREATE_PAGE/FETCH_RESOURCE_TYPES_SUGGESTIONS',
  'REQUEST_CREATE_PAGE/FETCH_RESOURCE_TYPES_SUGGESTIONS_SUCCESS',
  'REQUEST_CREATE_PAGE/FETCH_RESOURCE_TYPES_SUGGESTIONS_FAILURE'
)<void, ResourceTypeSuggestion[], Error>();

export const fetchAuthorSuggestions = createAsyncAction(
  'REQUEST_CREATE_PAGE/FETCH_AUTHOR_SUGGESTIONS',
  'REQUEST_CREATE_PAGE/FETCH_AUTHOR_SUGGESTIONS_SUCCESS',
  'REQUEST_CREATE_PAGE/FETCH_AUTHOR_SUGGESTIONS_FAILURE'
)<void, NamedModel[], Error>();

export const resetResourceTypeParameters = createAction(
  'REQUEST_CREATE_PAGE/RESET_RESOURCE_TYPE_PARAMETERS'
);

export const setResourceTypeParameters = createAction(
  'REQUEST_CREATE_PAGE/SET_RESOURCE_TYPE_PARAMETERS',
  action => (data: FullParameterModel[]) => action(data)
);

export const updateResourceTypeFormModel = createAction(
  'REQUEST_CREATE_PAGE/UPDATE_RESOURCE_TYPE_FORM_MODEL',
  action => {
    return (data: CreateRequestFormModel) => action(data);
  }
);

export const createNewRequest = createAsyncAction(
  'REQUEST_CREATE_PAGE/CREATE_NEW_REQUEST',
  'REQUEST_CREATE_PAGE/CREATE_NEW_REQUEST_SUCCESS',
  'REQUEST_CREATE_PAGE/CREATE_NEW_REQUEST_FAILURE'
)<CreateRequestDto, number, Error>();

export const resetRequestCreationStatus = createAction(
  'REQUEST_CREATE_PAGE/RESET_REQUEST_CREATION_STATUS'
);

export const resetRequestCreationFormModel = createAction(
  'REQUEST_CREATE_PAGE/RESET_REQUEST_CREATION_FORM_MODEL'
);

export const setQuantitative = createAction(
  'REQUEST_CREATE_PAGE/SET_QUANTITATIVE',
  action => (value: boolean) => action(value)
);

export const fetchProjectSuggestions = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/GET_PROJECT_SUGGESTIONS',
  'REQUEST_ACCEPT_PAGE/GET_PROJECT_SUGGESTIONS_SUCCESS',
  'REQUEST_ACCEPT_PAGE/GET_PROJECT_SUGGESTIONS_FAILURE'
)<void, NamedModel[], Error>();

export const resetProjectSuggestions = createAction('REQUEST_ACCEPT_PAGE/RESET_PROJECT_SUGGESTION');
