import RequestModel from '../get/request-model';
import { PageAndSortParams } from './page-and-sort-params';

export interface RequestParams extends PageAndSortParams<RequestModel> {
  typeName?: string | number;
  description?: string;
  statusId?: string | number;
}
