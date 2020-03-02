import { getType, RootAction } from 'typesafe-actions';
import { combineReducers } from 'redux';
import {
  fetchResourceTypesSuggestions,
  resetRequestFilters,
  resetResourceTypeParameters,
  setResourceTypeParameters,
  updateRequestFilters,
} from '../actions/request-filter-panel-actions';
import FullParameterModel from '../../model/get/full-parameter-model';
import { CustomFilterCmpContext } from '../../commons/components/aim-data-grid/aim-data-grid';

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

export interface ResourceTypeParametersState {
  parameters: FullParameterModel[];
  loading: boolean;
}

const getDefaultResourceTypeParameters = () => {
  const model: ResourceTypeParametersState = {
    parameters: [],
    loading: false,
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

const getDefaultFilters = () => {
  const model: CustomFilterCmpContext = {
    changeFilters: values => {},
    values: { description: '' },
  };
  return model;
};

const filters = (state: CustomFilterCmpContext = getDefaultFilters(), action: RootAction) => {
  switch (action.type) {
    case getType(updateRequestFilters):
      return action.payload;
    case getType(resetRequestFilters):
      return getDefaultFilters();
    default:
      return state;
  }
};

const requestFilterPanel = combineReducers({
  resourceTypeSuggestion,
  resourceTypeParameters,
  filters,
});

export default requestFilterPanel;
