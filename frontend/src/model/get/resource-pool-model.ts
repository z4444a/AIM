export interface ResourceType {
  id: number;
  name: string;
  quantitative: boolean;
}

export interface Name {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
}

export default interface ResourcePoolModel extends Name {
  id: number;
  name: string;
  resourceType: ResourceType;
  capacity: string;
  totalCapacity: number;
  currentCapacity: number;
  description: string;
  owners: Name[];
  active: boolean;
  requestsAmount: number;
}
