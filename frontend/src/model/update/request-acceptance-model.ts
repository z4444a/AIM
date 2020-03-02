import { ParameterValueCreateModel } from '../create/parameter-value-create-model';
import BaseModel from '../base/base-model';

export interface RequestAcceptanceModel extends BaseModel {
  poolId: number;
  allocationValues?: ParameterValueCreateModel[];
  comment?: string;
}
