import NamedModel from '../base/named-model';
import BaseModel from '../base/base-model';

export interface RequestStatusChangeGetModel extends BaseModel {
  datetime: Date;
  status: NamedModel;
  author: NamedModel;
}
