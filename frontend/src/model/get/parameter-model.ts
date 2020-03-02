import BaseModel from '../base/base-model';
import { ParameterModifier } from '../parameter-modifier';

export default interface ParameterModel extends BaseModel {
  name: string;
  type: string;
  required: boolean;
  modifier: ParameterModifier;
  poolTypeId?: number;
}
