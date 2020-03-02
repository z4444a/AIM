import { ListValueFormModel } from './list-value-form-model';

export interface ParameterConstraintFormModel {
  minNumberValue?: number;
  maxNumberValue?: number;
  minDateToday?: boolean;
  maxDateToday?: boolean;
  minDateValue?: Date;
  maxDateValue?: Date;
  maxStringLength?: number;
  regExp?: string;
  minRealValue?: number;
  maxRealValue?: number;
  listValues?: ListValueFormModel[];
  multipleMax?: number;
}
