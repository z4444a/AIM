import { ParameterCreateModel } from './parameters-create-model';
import { PictureCreateModel } from './picture-create-model';

export interface TypeCreateModel {
  name: string;
  description: string;
  active: boolean;
  needsBackup: boolean;
  quantitative: boolean;
  picture: PictureCreateModel;
  parameters: ParameterCreateModel[];
}
