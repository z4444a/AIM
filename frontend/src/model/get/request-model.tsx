import BaseModel from '../base/base-model';
import NamedModel from '../base/named-model';
import { RequestState } from './request-state';
import CountableTypeGetModel from './countable-type-get-model';
import ParamValueShortVer from './param-value-short-ver';
import { CommentGetModel } from './comment-get-model';

export default interface RequestModel extends BaseModel {
  creation: Date;
  usageStart: Date;
  usageFinish: Date;
  description: string;
  paused: string;
  needsBackup: boolean;
  monitoring: boolean;
  state: RequestState;
  author: NamedModel;
  owner: NamedModel;
  project: NamedModel;
  type: CountableTypeGetModel;
  status: NamedModel;
  pool: NamedModel;
  amount: number;
  parameterValues: ParamValueShortVer[];
  comments: CommentGetModel[];
}
