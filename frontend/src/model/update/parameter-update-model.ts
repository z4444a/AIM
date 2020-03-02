import { ParameterType } from '../parameter-type';
import { ParameterConstraintUpdateModel } from './parameter-constraint-update-model';
import { ParameterModifier } from '../parameter-modifier';

export interface ParameterUpdateModel {
  id?: number;
  name: string;
  identifier: string;
  required: boolean;
  modifier: ParameterModifier;
  parameterType: ParameterType;
  constraint: ParameterConstraintUpdateModel;
}
