import FullParameterModel from '../../model/get/full-parameter-model';
import { getType, RootAction } from 'typesafe-actions';
import {
  createNewResourcePool,
  fetchResourceTypesSuggestions,
  resetResourcePoolFormModel,
  resetResourceTypeParameters,
  setResourceType,
  updatePoolParametersValues,
  updateResourcePoolFormModel,
} from '../actions/resource-pool-create-page-actions';
import { combineReducers } from 'redux';
import { ResourcePoolFormModel } from '../../modules/resource-pool/components/resource-pool-form/resource-pool-form';
import { resetRequestCreationStatus } from '../actions/request-create-page-actions';
import { ParameterValueFormModel } from '../../model/form/parameter-value-form-model';
import { fetchPoolTypedSuggestions } from '../actions/request-accept-page-action';
import { NamedTypedModel } from '../../model/get/named-typed-model';

export interface ResourceTypeSuggestion {
  id: string;
  active: boolean;
  name: string;
  quantitative: boolean;
  description?: string;
  parameters: FullParameterModel[];
}

export interface ResourceTypeSuggestionState {
  initialized: boolean;
  loading: boolean;
  inputValue: string;
  suggestions: ResourceTypeSuggestion[];
}

export enum ResourcePoolCreationStatus {
  FormFilling = 'FormFilling',
  ProcessedOnServer = 'ProcessedOnServer',
  SuccessfullyCreated = 'SuccessfullyCreated',
  CreationError = 'CreationError',
}

export interface ResourcePoolCreationStatusState {
  status: ResourcePoolCreationStatus;
}

const getDefaultResourcePoolCreationStatus = () => {
  const model: ResourcePoolCreationStatusState = {
    status: ResourcePoolCreationStatus.FormFilling,
  };
  return model;
};

const getDefaultResourceTypeSuggestion = () => {
  const model: ResourceTypeSuggestionState = {
    initialized: false,
    loading: false,
    inputValue: '',
    suggestions: [],
  };
  return model;
};

const getDefaultFormModel = () => {
  const model: ResourcePoolFormModel = {
    name: '',
    active: true,
    monitoring: false,
    owners: [],
    priority: 100,
    allocationTypeId: 3,
  };
  return model;
};

const resourceTypeSuggestion = (
  state: ResourceTypeSuggestionState = getDefaultResourceTypeSuggestion(),
  action: RootAction
) => {
  switch (action.type) {
    case getType(fetchResourceTypesSuggestions.request):
      return Object.assign({}, state, { loading: true });
    case getType(fetchResourceTypesSuggestions.success):
      return Object.assign({}, state, {
        loading: false,
        suggestions: action.payload,
        initialized: true,
      });
    case getType(fetchResourceTypesSuggestions.failure):
      return Object.assign({}, state, { loading: false, suggestions: [], initialized: false });
    default:
      return state;
  }
};

const formModel = (state: ResourcePoolFormModel = getDefaultFormModel(), action: RootAction) => {
  switch (action.type) {
    case getType(updateResourcePoolFormModel):
      return action.payload;
    case getType(resetResourcePoolFormModel):
      return getDefaultFormModel();
    default:
      return state;
  }
};

const previousParametersValues = (state: ParameterValueFormModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(updatePoolParametersValues):
      return action.payload;
    default:
      return state;
  }
};

const resourceType = (
  state: ResourceTypeSuggestion | null = null,
  action: RootAction
): ResourceTypeSuggestion | null => {
  switch (action.type) {
    case getType(resetResourceTypeParameters):
      return null;
    case getType(setResourceType):
      return action.payload;
    default:
      return state;
  }
};

const creationStatus = (
  state: ResourcePoolCreationStatusState = getDefaultResourcePoolCreationStatus(),
  action: RootAction
) => {
  switch (action.type) {
    case getType(resetRequestCreationStatus):
      return { status: ResourcePoolCreationStatus.FormFilling };
    case getType(createNewResourcePool.request):
      return { status: ResourcePoolCreationStatus.ProcessedOnServer };
    case getType(createNewResourcePool.success):
      return { status: ResourcePoolCreationStatus.SuccessfullyCreated };
    case getType(createNewResourcePool.failure):
      return { status: ResourcePoolCreationStatus.CreationError };
    default:
      return state;
  }
};

const poolSuggestions = (state: NamedTypedModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(fetchPoolTypedSuggestions.success):
      if (action.payload.length === 0) {
        return state;
      }
      const typeId = action.payload[0].typeId;
      const otherType = state.filter(item => item.typeId !== typeId);
      return [...otherType, ...action.payload];
    case getType(fetchPoolTypedSuggestions.request):
      return state;
    case getType(fetchPoolTypedSuggestions.failure):
      return [];
    default:
      return state;
  }
};

const resourcePoolCreatePage = combineReducers({
  resourceTypeSuggestion,
  formModel,
  resourceType,
  previousParametersValues,
  creationStatus,
  poolSuggestions,
});

export default resourcePoolCreatePage;
