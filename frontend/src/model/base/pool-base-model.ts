import BaseModel from './base-model';

export interface PoolBaseModel {
  name?: string;
  resourceTypeId?: number;
  monitoring?: boolean;
  active?: boolean;
  totalCapacity?: number;
  priority?: number;
  description?: string;
  allocationTypeId?: number;
  owners?: BaseModel[];
}
