import { getType, RootAction } from 'typesafe-actions';
import { combineReducers } from 'redux';
import {
  createNewRequest,
  fetchAuthorSuggestions,
  fetchProjectSuggestions,
  fetchResourceTypesSuggestions,
  resetProjectSuggestions,
  resetRequestCreationFormModel,
  resetRequestCreationStatus,
  resetResourceTypeParameters,
  setQuantitative,
  setResourceTypeParameters,
  updateResourceTypeFormModel,
} from '../actions/request-create-page-actions';
import { CreateRequestFormModel } from '../../modules/requests/components/request-create-form/request-create-form';
import FullParameterModel from '../../model/get/full-parameter-model';
import NamedModel from '../../model/base/named-model';

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

export interface AuthorSuggestionState {
  initialized: boolean;
  loading: boolean;
  inputValue: string;
  suggestions: NamedModel[];
}

export interface ResourceTypeParametersState {
  parameters: FullParameterModel[];
  loading: boolean;
}

export enum RequestCreationStatus {
  FormFilling = 'FormFilling',
  ProcessedOnServer = 'ProcessedOnServer',
  SuccessfullyCreated = 'SuccessfullyCreated',
  CreationError = 'CreationError',
}

export interface RequestCreationStatusState {
  status: RequestCreationStatus;
  id: number;
}

const getDefaultRequestCreationStatus = () => {
  const model: RequestCreationStatusState = {
    status: RequestCreationStatus.FormFilling,
    id: 0,
  };
  return model;
};

const getDefaultResourceTypeParameters = () => {
  const model: ResourceTypeParametersState = {
    parameters: [],
    loading: false,
  };
  return model;
};

const getDefaultFormModel = () => {
  const model: CreateRequestFormModel = {
    name: '',
    startDate: new Date(),
    endDate: null,
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

const getDefaultAuthorSuggestion = () => {
  const model: AuthorSuggestionState = {
    initialized: false,
    loading: false,
    inputValue: '',
    suggestions: [],
  };
  return model;
};

const formModel = (state: CreateRequestFormModel = getDefaultFormModel(), action: RootAction) => {
  switch (action.type) {
    case getType(updateResourceTypeFormModel):
      return Object.assign({}, action.payload);
    case getType(resetRequestCreationFormModel):
      return getDefaultFormModel();
    default:
      return state;
  }
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

const authorSuggestion = (
  state: AuthorSuggestionState = getDefaultAuthorSuggestion(),
  action: RootAction
) => {
  switch (action.type) {
    case getType(fetchAuthorSuggestions.request):
      return Object.assign({}, state, { loading: true });
    case getType(fetchAuthorSuggestions.success):
      return Object.assign({}, state, {
        loading: false,
        suggestions: action.payload,
        initialized: true,
      });
    case getType(fetchAuthorSuggestions.failure):
      return Object.assign({}, state, { loading: false, suggestions: [], initialized: false });
    default:
      return state;
  }
};

const resourceTypeParameters = (
  state: ResourceTypeParametersState = getDefaultResourceTypeParameters(),
  action: RootAction
) => {
  switch (action.type) {
    case getType(resetResourceTypeParameters):
      return Object.assign({}, state, { loading: false, parameters: [] });
    case getType(setResourceTypeParameters):
      return Object.assign({}, state, {
        loading: false,
        parameters: action.payload,
      });
    default:
      return state;
  }
};

const requestCreationStatus = (
  state: RequestCreationStatusState = getDefaultRequestCreationStatus(),
  action: RootAction
) => {
  switch (action.type) {
    case getType(resetRequestCreationStatus):
      return { status: RequestCreationStatus.FormFilling, id: 0 };
    case getType(createNewRequest.request):
      return { status: RequestCreationStatus.ProcessedOnServer, id: 0 };
    case getType(createNewRequest.success):
      return { status: RequestCreationStatus.SuccessfullyCreated, id: action.payload };
    case getType(createNewRequest.failure):
      return { status: RequestCreationStatus.CreationError, id: 0 };
    default:
      return state;
  }
};

const isTypeQuantitative = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(setQuantitative):
      return action.payload;
    default:
      return state;
  }
};

const projectSuggestions = (state: NamedModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(fetchProjectSuggestions.request):
      return state;
    case getType(fetchProjectSuggestions.success):
      return action.payload;
    case getType(resetProjectSuggestions):
      return [];
    case getType(fetchProjectSuggestions.failure):
    default:
      return state;
  }
};

const requestCreatePage = combineReducers({
  formModel,
  resourceTypeSuggestion,
  authorSuggestion,
  resourceTypeParameters,
  requestCreationStatus,
  isTypeQuantitative,
  projectSuggestions,
});

export default requestCreatePage;
