import { ProjectModel } from '../../model/get/project-model';
import { getType, RootAction } from 'typesafe-actions';
import { clearProjectPage, fetchProjectPage } from '../actions/project-actions';

const projectPageReducer = (
  state: ProjectModel[] | [] = [],
  action: RootAction
): ProjectModel[] | [] => {
  switch (action.type) {
    case getType(fetchProjectPage.request):
      return state;
    case getType(fetchProjectPage.success):
      return action.payload.content;
    case getType(clearProjectPage):
      return [];
    case getType(fetchProjectPage.failure):
    default:
      return state;
  }
};

export default projectPageReducer;
