import { ParameterFormModel } from './parameter-form-model';
import { PictureFormModel } from './picture-form-model';

export interface TypeFormModel {
  id?: number;
  name: string;
  description: string;
  active: boolean;
  needsBackup: boolean;
  quantitative: boolean;
  picture: PictureFormModel;
  parameters: ParameterFormModel[];
}
