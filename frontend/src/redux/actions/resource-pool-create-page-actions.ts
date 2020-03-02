import { createAction, createAsyncAction } from 'typesafe-actions';
import { ResourceTypeSuggestion } from '../reducers/resource-pool-create-page-reducer';
import { ResourcePoolFormModel } from '../../modules/resource-pool/components/resource-pool-form/resource-pool-form';
import { PoolCreateModel } from '../../model/create/pool-create-model';
import { ItemSelection } from '../../commons/components/aim-multiple-select/aim-multiple-select';
import { ParameterValueFormModel } from '../../model/form/parameter-value-form-model';

export const fetchResourceTypesSuggestions = createAsyncAction(
  'RESOURCE_POOL_CREATE_PAGE/FETCH_RESOURCE_TYPES_SUGGESTIONS',
  'RESOURCE_POOL_CREATE_PAGE/FETCH_RESOURCE_TYPES_SUGGESTIONS_SUCCESS',
  'RESOURCE_POOL_CREATE_PAGE/FETCH_RESOURCE_TYPES_SUGGESTIONS_FAILURE'
)<void, ResourceTypeSuggestion[], Error>();

export const createNewResourcePool = createAsyncAction(
  'RESOURCE_POOL_CREATE_PAGE/CREATE_NEW_RESOURCE_POOL',
  'RESOURCE_POOL_CREATE_PAGE/CREATE_NEW_RESOURCE_POOL_SUCCESS',
  'RESOURCE_POOL_CREATE_PAGE/CREATE_NEW_RESOURCE_POOL_FAILURE'
)<PoolCreateModel, void, Error>();

export const resetResourceTypeParameters = createAction(
  'RESOURCE_POOL_CREATE_PAGE/RESET_RESOURCE_TYPE_PARAMETERS'
);

export const setResourceType = createAction(
  'RESOURCE_POOL_CREATE_PAGE/SET_RESOURCE_TYPE_PARAMETERS',
  action => (data: ResourceTypeSuggestion) => action(data)
);

export const updateResourcePoolFormModel = createAction(
  'RESOURCE_POOL_CREATE_PAGE/UPDATE_RESOURCE_TYPE_FORM_MODEL',
  action => {
    return (data: ResourcePoolFormModel) => action(data);
  }
);

export const resetResourcePoolFormModel = createAction(
  'RESOURCE_POOL_CREATE_PAGE/RESET_RESOURCE_POOL_CREATION_FORM_MODEL'
);

export const selectOwners = createAction(
  'RESOURCE_POOL_CREATE_PAGE/SELECT_OWNERS',
  action => (data: ItemSelection) => action(data)
);

export const updatePoolParametersValues = createAction(
  'RESOURCE_POOL_CREATE_PAGE/UPDATE_POOL_PARAMETERS_VALUES',
  action => {
    return (data: ParameterValueFormModel[]) => action(data);
  }
);
