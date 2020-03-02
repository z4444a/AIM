import { ConstraintCreateModel } from '../create/constraint-create-model';
import { ListValueGetModel } from './valueList-get-model';
import { ParameterType } from '../parameter-type';
import { ParameterModifier } from '../parameter-modifier';

export interface ParameterGetModel {
  id: number;
  identifier: string;
  name: string;
  modifier: ParameterModifier;
  required: boolean;
  parameterType: ParameterType;
  valueList: ListValueGetModel[];
  constraint: ConstraintCreateModel;
  order: number;
  poolTypeId?: number;
}
