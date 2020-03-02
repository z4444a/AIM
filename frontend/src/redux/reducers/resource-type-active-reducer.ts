import { fetchAllActiveResourceTypes } from '../actions/resource-type-actions';
import { RootAction } from 'typesafe-actions';
import { getType } from 'typesafe-actions';
import FullParameterModel from '../../model/get/full-parameter-model';

export interface ResourceTypeSuggestion {
  id: number;
  active: boolean;
  name: string;
  description?: string;
  parameters: FullParameterModel[];
}

const resourceTypesActiveReducer = (
  state: ResourceTypeSuggestion[] = [],
  action: RootAction
): ResourceTypeSuggestion[] => {
  switch (action.type) {
    case getType(fetchAllActiveResourceTypes.request):
      return state;
    case getType(fetchAllActiveResourceTypes.success):
      return action.payload;
    case getType(fetchAllActiveResourceTypes.failure):
    default:
      return state;
  }
};

export default resourceTypesActiveReducer;
