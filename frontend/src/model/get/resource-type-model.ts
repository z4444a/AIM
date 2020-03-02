import BaseModel from '../base/base-model';
import { ParameterGetModel } from './parameters-get-model';

export default interface ResourceTypeModel extends BaseModel {
  name: string;
  description?: string;
  active: boolean;
  quantitative: boolean;
  parameters: ParameterGetModel[];
  numberOfPools?: number;
  numberOfRequests?: number[];
}
