import { ParameterValueFormModel } from './parameter-value-form-model';
import { PoolBaseModel } from '../base/pool-base-model';

export interface PoolFormModel extends PoolBaseModel {
  parametersValues?: ParameterValueFormModel[];
}

export interface Errors {
  id: number;
  error: boolean;
}
