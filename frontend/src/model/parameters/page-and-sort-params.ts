import BaseModel from '../base/base-model';
import { SortOrder } from '../../modules/resource-pool/SortOrder';

export interface PageAndSortParams<M extends BaseModel> {
  sortBy?: keyof M;
  order?: SortOrder;
  page?: number;
  pageSize: number;
}
