import BaseModel from './base-model';

export default interface NamedModel extends BaseModel {
  name: string;
}
