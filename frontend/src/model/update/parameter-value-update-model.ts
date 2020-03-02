import { ParameterValueFormModel } from '../form/parameter-value-form-model';

export interface ParameterValueUpdateModel extends ParameterValueFormModel {
  parameterPoolId?: number;
}
