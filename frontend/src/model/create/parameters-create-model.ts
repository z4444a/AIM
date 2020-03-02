import { ConstraintCreateModel } from './constraint-create-model';
import { ParameterType } from '../parameter-type';
import { ParameterModifier } from '../parameter-modifier';

export interface ParameterCreateModel {
  identifier: string;
  name: string;
  modifier: ParameterModifier;
  required: boolean;
  parameterType: ParameterType;
  constraint: ConstraintCreateModel;
  order: number;
  poolTypeId?: number;
}
