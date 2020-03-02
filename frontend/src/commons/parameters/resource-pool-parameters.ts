import ResourcePoolModel from '../../model/get/resource-pool-model';
import { PageAndSortParams } from '../../model/parameters/page-and-sort-params';

export default interface ResourcePoolParameters extends PageAndSortParams<ResourcePoolModel> {
  name?: string;
  type?: number;
  active?: boolean | undefined;
  onlyMine?: boolean | undefined;
}
