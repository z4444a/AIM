import { ProjectActions, ProjectAsync } from './action-types';
import { createAction, createAsyncAction } from 'typesafe-actions';
import PageModel from '../../model/base/page-model';
import { ProjectParams } from '../../model/parameters/project-params';
import { ProjectModel } from '../../model/get/project-model';

export const fetchProjectPage = createAsyncAction(
  ProjectAsync.GET_SUGGESTIONS,
  ProjectAsync.GET_SUGGESTIONS_SUCCESS,
  ProjectAsync.GET_SUGGESTIONS_FAILURE
)<ProjectParams | undefined, PageModel<ProjectModel>, Error>();

export const clearProjectPage = createAction(ProjectActions.CLEAR_SUGGESTIONS);
