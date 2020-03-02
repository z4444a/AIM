import NamedModel from '../base/named-model';
import BaseModel from '../base/base-model';

export interface ParameterValueFormModel {
  id?: number;
  parameterPool?: NamedModel;
  parameterId: number;
  poolId?: number;
  numberValue?: number;
  realValue?: number;
  stringValue?: string;
  dateValue?: Date;
  listValue?: BaseModel;
  order: number;
}
