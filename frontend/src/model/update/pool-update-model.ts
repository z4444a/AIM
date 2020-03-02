import BaseModel from '../base/base-model';
import { ParameterValueUpdateModel } from './parameter-value-update-model';
import { PoolBaseModel } from '../base/pool-base-model';

export interface PoolUpdateModel extends BaseModel, PoolBaseModel {
  parametersValues: ParameterValueUpdateModel[];
}
