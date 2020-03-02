import { PoolBaseModel } from '../base/pool-base-model';
import { ParameterValueCreateModel } from './parameter-value-create-model';

export interface PoolCreateModel extends PoolBaseModel {
  parametersValues?: ParameterValueCreateModel[];
}
