import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { RequestAcceptPage } from './request-accept-page';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { RootState } from 'typesafe-actions';
import {
  acceptRequestAction,
  closeRequestAction,
  defaultState,
  fetchParametersRequest,
  fetchParameterValues,
  fetchPoolAllocationSuggestions,
  fetchRequestAction,
  fetchRequestHistory,
  hideDialog,
  pauseRequestAction,
  rejectRequestAction,
  resetComment,
  resetParameterValues,
  resetRequest,
  resumeRequestAction,
  setAcceptance,
  setRejection,
  showDialog,
  updateComment,
} from '../../../../redux/actions/request-accept-page-action';
import { leaveCommentAction } from '../../../../redux/actions/comment-actions';
import { CommentCreateModel } from '../../../../model/create/comment-create-model';
import { ParameterParameters } from '../../../../model/parameters/parameter-parameters';
import { RequestAcceptanceModel } from '../../../../model/update/request-acceptance-model';

export const mapDispatchToProps = (dispatch: Function) => ({
  fetchRequest: (id: number) => dispatch(fetchRequestAction.request(id)),
  pause: (id: number) => dispatch(pauseRequestAction.request(id)),
  close: (id: number) => {
    dispatch(closeRequestAction.request(id));
  },
  resume: (id: number) => dispatch(resumeRequestAction.request(id)),
  reject: (comment: CommentCreateModel) => dispatch(rejectRequestAction.request(comment)),
  accept: (dto: RequestAcceptanceModel) => dispatch(acceptRequestAction.request(dto)),
  resetState: () => dispatch(defaultState()),
  showDialog: () => dispatch(showDialog()),
  hideDialog: () => dispatch(hideDialog()),
  submitComment: (comment: CommentCreateModel) => dispatch(leaveCommentAction.request(comment)),
  chooseAcceptance: () => dispatch(setAcceptance()),
  chooseRejection: () => dispatch(setRejection()),
  fetchParameters: (params: ParameterParameters) => dispatch(fetchParametersRequest(params)),
  updateComment: (content: string) => dispatch(updateComment(content)),
  resetComment: () => dispatch(resetComment()),
  resetRequest: () => dispatch(resetRequest()),
  fetchValues: (requestId: number) => dispatch(fetchParameterValues.request(requestId)),
  resetValues: () => dispatch(resetParameterValues()),
  getPoolSuggestions: (requestId: number) =>
    dispatch(fetchPoolAllocationSuggestions.request(requestId)),
  fetchHistory: (id: number) => dispatch(fetchRequestHistory.request(id)),
});

export const mapStateToProps = (state: RootState) => ({
  request: state.requestAcceptPage.fetchRequest,
  status: state.requestAcceptPage.fetchRequestResult.status,
  open: state.requestAcceptPage.isDialogOpened,
  approved: state.requestAcceptPage.needAcceptance,
  allocationParameters: state.requestAcceptPage.fetchAllocationParameters,
  requestParameters: state.requestAcceptPage.fetchRequestParameters,
  comment: state.requestAcceptPage.comment,
  user: state.tokens ? state.tokens.user : null,
  suggestions: state.requestAcceptPage.poolSuggestions,
  requestHistory: state.requestAcceptPage.fetchHistory,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(withTranslation('common')(RequestAcceptPage))));
