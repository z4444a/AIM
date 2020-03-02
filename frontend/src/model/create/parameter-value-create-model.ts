import { ParameterValueFormModel } from '../form/parameter-value-form-model';

export interface ParameterValueCreateModel extends ParameterValueFormModel {
  parameterPoolId?: number;
}
