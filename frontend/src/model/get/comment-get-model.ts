import BaseModel from '../base/base-model';
import NamedModel from '../base/named-model';

export interface CommentGetModel {
  datetime: Date;
  content: string;
  request: BaseModel;
  author: NamedModel;
}
