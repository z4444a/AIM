import { ProjectModel } from '../get/project-model';
import { ProjectStatus } from '../get/project-status';
import { PageAndSortParams } from './page-and-sort-params';

export interface ProjectParams extends PageAndSortParams<ProjectModel> {
  name?: string;
  status?: ProjectStatus;
}
