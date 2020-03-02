import { PictureGetModel } from './picture-get-model';
import { ParameterGetModel } from './parameters-get-model';

export interface TypeGetModel {
  id: number;
  name: string;
  description: string;
  active: boolean;
  needsBackup: boolean;
  quantitative: boolean;
  picture: PictureGetModel;
  parameters: ParameterGetModel[];
}
