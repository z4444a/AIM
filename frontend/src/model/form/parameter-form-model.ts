import { ParameterConstraintFormModel } from './parameter-constraint-form-model';
import { ParameterType } from '../parameter-type';
import { ParameterModifier } from '../parameter-modifier';

export interface ParameterFormModel {
  id?: number;
  key?: number;
  name: string;
  identifier: string;
  required: boolean;
  visibleToOwner?: boolean;
  modifier: ParameterModifier;
  parameterType: ParameterType;
  constraint: ParameterConstraintFormModel;
  order: number;
  poolTypeId?: number;
}
