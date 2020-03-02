import BaseModel from '../base/base-model';
import ContentModel from '../base/content-model';
import { ParameterModifier } from '../parameter-modifier';

export enum ParameterType {
  NUMBER = 'NUMBER',
  LIST = 'LIST',
  TEXT = 'TEXT',
  DATE = 'DATE',
  REAL = 'REAL',
  POOL = 'POOL',
}

export interface ParameterConstraint {
  minNumberValue: number;
  maxNumberValue: number;
  minDateValue: Date;
  maxDateValue: Date;
  minDateToday: boolean;
  maxDateToday: boolean;
  minRealValue: number;
  maxRealValue: number;
  maxStringLength: number;
  regExp: string;
  listValues: ContentModel[];
  multipleMax?: number;
}

export default interface FullParameterModel extends BaseModel {
  identifier: string;
  name: string;
  parameterType: ParameterType;
  required: boolean;
  modifier: ParameterModifier;
  constraint?: ParameterConstraint;
  order: number;
  poolTypeId?: number;
}
