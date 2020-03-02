import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import {
  clearResourceTypeSuggestions,
  fetchResourceTypeSuggestions,
} from '../actions/resource-type-actions';
import ResourceTypeModel from '../../model/get/resource-type-model';

const resourceTypeSuggestionReducer = (
  state: ResourceTypeModel[] | [] = [],
  action: RootAction
): ResourceTypeModel[] | [] => {
  switch (action.type) {
    case getType(fetchResourceTypeSuggestions.request):
      return state;
    case getType(fetchResourceTypeSuggestions.success):
      return action.payload.content;
    case getType(clearResourceTypeSuggestions):
      return [];
    case getType(fetchResourceTypeSuggestions.failure):
    default:
      return state;
  }
};

export default resourceTypeSuggestionReducer;
