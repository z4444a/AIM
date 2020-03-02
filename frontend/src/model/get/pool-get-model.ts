import NamedModel from '../base/named-model';
import BaseModel from '../base/base-model';
import { ParameterValueGetModel } from './parameter-value-get-model';
import { ResourceAllocationType } from '../resource-allocation-type';

export interface PoolGetModel extends BaseModel {
  name: string;
  resourceType: NamedModel;
  owners: NamedModel[];
  monitoring: boolean;
  active: boolean;
  totalCapacity: number;
  priority: number;
  description: string;
  allocationTypeId: ResourceAllocationType;
  parametersValues: ParameterValueGetModel[];
}
