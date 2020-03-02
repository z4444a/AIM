import NamedModel from '../base/named-model';
import { ProjectStatus } from './project-status';

export interface ProjectModel extends NamedModel {
  status: ProjectStatus;
}
