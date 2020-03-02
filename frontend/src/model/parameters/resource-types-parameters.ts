import ResourceTypeModel from '../get/resource-type-model';
import { PageAndSortParams } from './page-and-sort-params';

export interface ResourceTypesParams extends PageAndSortParams<ResourceTypeModel> {
  name?: string;
  active?: boolean | undefined;
}
