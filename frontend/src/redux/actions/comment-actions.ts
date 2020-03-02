import { createAsyncAction } from 'typesafe-actions';
import { CommentCreateModel } from '../../model/create/comment-create-model';
import { CommentGetModel } from '../../model/get/comment-get-model';

export const leaveCommentAction = createAsyncAction(
  'LEAVE_COMMENT',
  'LEAVE_COMMENT_SUCCESS',
  'LEAVE_COMMENT_FAILURE'
)<CommentCreateModel, CommentGetModel, Error>();
