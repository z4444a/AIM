import { PictureUpdateModel } from './picture-update-model';
import { ParameterUpdateModel } from './parameter-update-model';

export interface TypeUpdateModel {
  id: number;
  name: string;
  description: string;
  active: boolean;
  needsBackup: boolean;
  quantitative: boolean;
  picture: PictureUpdateModel;
  parameters: ParameterUpdateModel[];
}
