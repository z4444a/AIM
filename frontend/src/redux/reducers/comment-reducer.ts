import { RootAction } from 'typesafe-actions/dist/create-reducer';
import { getType } from 'typesafe-actions';
import { CommentGetModel } from '../../model/get/comment-get-model';
import { leaveCommentAction } from '../actions/comment-actions';

const leaveComment = (state: CommentGetModel | null = null, action: RootAction) => {
  switch (action.type) {
    case getType(leaveCommentAction.request):
      return state;
    case getType(leaveCommentAction.success):
      return action.payload;
    case getType(leaveCommentAction.failure):
    default:
      return state;
  }
};
export default leaveComment;
