import { ParameterValueCreateModel } from './parameter-value-create-model';

export interface CreateRequestDto {
  description: string;
  usageStart: string;
  usageFinish: string;
  typeId: number;
  authorId: number;
  projectId?: number;
  resourceTypeParams?: ParameterValueCreateModel[];
  amount?: number;
}
