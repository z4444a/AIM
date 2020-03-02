import { getType } from 'typesafe-actions';
import { RootAction } from 'typesafe-actions/dist/create-reducer';
import RequestModel from '../../model/get/request-model';
import { combineReducers } from 'redux';
import {
  acceptRequestAction,
  closeRequestAction,
  defaultState,
  fetchAllocationParametersAction,
  fetchParameterValues,
  fetchPoolAllocationSuggestions,
  fetchRequestAction,
  fetchRequestHistory,
  fetchRequestParametersAction,
  hideDialog,
  pauseRequestAction,
  poolCapacityIsNotEnough,
  rejectRequestAction,
  resetComment,
  resetDialogValues,
  resetParameterValues,
  resetRequest,
  resetSelectedPool,
  resumeRequestAction,
  selectPool,
  setAcceptance,
  setRejection,
  showDialog,
  updateComment,
  updateDialogValues,
} from '../actions/request-accept-page-action';
import { GenericFormValue } from '../../commons/components/generic-fields/models/field-config.model';
import NamedModel from '../../model/base/named-model';
import FullParameterModel from '../../model/get/full-parameter-model';
import { RequestStatusChangeGetModel } from '../../model/get/request-status-change-get-model';
import { ParameterValueFormModel } from '../../model/form/parameter-value-form-model';

export enum RequestPageStatus {
  DEFAULT = 'DEFAULT',
  SUCCESSFULLY_ACCEPTED = 'SUCCESSFULLY_ACCEPTED',
  ACCEPTANCE_ERROR = 'ACCEPTANCE_ERROR',
  POOL_CAPACITY_IS_NOT_ENOUGH = 'POOL_CAPACITY_IS_NOT_ENOUGH',
  SUCCESSFULLY_REJECTED = 'SUCCESSFULLY_REJECTED',
  REJECTION_ERROR = 'REJECTION_ERROR',
  SUCCESSFULLY_PAUSED = 'SUCCESSFULLY_PAUSED',
  PAUSING_ERROR = 'PAUSING_ERROR',
  SUCCESSFULLY_CLOSED = 'SUCCESSFULLY_CLOSED',
  CLOSING_ERROR = 'CLOSING_ERROR',
  SUCCESSFULLY_RESUMED = 'SUCCESSFULLY_RESUMED',
  RESUMING_ERROR = 'RESUMING_ERROR',
}

export interface RequestPageStatusState {
  status: RequestPageStatus;
}
const getDefaultPageStatus = () => {
  return {
    status: RequestPageStatus.DEFAULT,
  };
};

const fetchRequest = (state: RequestModel | null = null, action: RootAction) => {
  switch (action.type) {
    case getType(fetchRequestAction.request):
      return state;
    case getType(fetchRequestAction.success):
      return action.payload;
    case getType(resetRequest):
      return null;
    case getType(fetchRequestAction.failure):
    default:
      return state;
  }
};

const fetchRequestResult = (
  state: RequestPageStatusState = getDefaultPageStatus(),
  action: RootAction
) => {
  switch (action.type) {
    case getType(defaultState):
      return getDefaultPageStatus();
    case getType(poolCapacityIsNotEnough):
      return { status: RequestPageStatus.POOL_CAPACITY_IS_NOT_ENOUGH };
    case getType(acceptRequestAction.request):
      return state;
    case getType(acceptRequestAction.success):
      return { status: RequestPageStatus.SUCCESSFULLY_ACCEPTED };
    case getType(acceptRequestAction.failure):
      return { status: RequestPageStatus.ACCEPTANCE_ERROR };
    case getType(rejectRequestAction.request):
      return state;
    case getType(rejectRequestAction.success):
      return { status: RequestPageStatus.SUCCESSFULLY_REJECTED };
    case getType(rejectRequestAction.failure):
      return { status: RequestPageStatus.REJECTION_ERROR };
    case getType(pauseRequestAction.request):
      return state;
    case getType(pauseRequestAction.success):
      return { status: RequestPageStatus.SUCCESSFULLY_PAUSED };
    case getType(pauseRequestAction.failure):
      return { status: RequestPageStatus.PAUSING_ERROR };
    case getType(closeRequestAction.request):
      return state;
    case getType(closeRequestAction.success):
      return { status: RequestPageStatus.SUCCESSFULLY_CLOSED };
    case getType(closeRequestAction.failure):
      return { status: RequestPageStatus.CLOSING_ERROR };
    case getType(resumeRequestAction.request):
      return state;
    case getType(resumeRequestAction.success):
      return { status: RequestPageStatus.SUCCESSFULLY_RESUMED };
    case getType(resumeRequestAction.failure):
      return { status: RequestPageStatus.RESUMING_ERROR };
    default:
      return state;
  }
};

const isDialogOpened = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(showDialog):
      return true;
    case getType(hideDialog):
      return false;
    default:
      return state;
  }
};

const needAcceptance = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(setAcceptance):
      return true;
    case getType(setRejection):
      return false;
    default:
      return state;
  }
};

const allocationParameterValues = (state: GenericFormValue = {}, action: RootAction) => {
  switch (action.type) {
    case getType(updateDialogValues):
      return Object.assign({}, action.payload);
    case getType(resetDialogValues):
      return {};
    default:
      return state;
  }
};

const currentParameterValues = (state: ParameterValueFormModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(fetchParameterValues.success):
      return action.payload;
    case getType(fetchParameterValues.request):
      return state;
    case getType(fetchParameterValues.failure):
      return [];
    case getType(resetParameterValues):
      return [];
    default:
      return state;
  }
};

const comment = (state = '', action: RootAction) => {
  switch (action.type) {
    case getType(updateComment):
      return action.payload;
    case getType(resetComment):
      return '';
    default:
      return state;
  }
};

const poolSuggestions = (state: NamedModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(fetchPoolAllocationSuggestions.success):
      return action.payload;
    case getType(fetchPoolAllocationSuggestions.request):
      return state;
    case getType(fetchPoolAllocationSuggestions.failure):
      return [];
    default:
      return state;
  }
};

const selectedPool = (state: NamedModel | null = null, action: RootAction) => {
  switch (action.type) {
    case getType(selectPool):
      return action.payload;
    case getType(resetSelectedPool):
      return null;
    default:
      return state;
  }
};

const fetchRequestParameters = (state: FullParameterModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(fetchRequestParametersAction):
      return action.payload;
    default:
      return state;
  }
};
const fetchAllocationParameters = (state: FullParameterModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(fetchAllocationParametersAction):
      return action.payload;
    default:
      return state;
  }
};

const fetchHistory = (state: RequestStatusChangeGetModel[] = [], action: RootAction) => {
  switch (action.type) {
    case getType(fetchRequestHistory.request):
      return state;
    case getType(fetchRequestHistory.success):
      return action.payload;
    case getType(fetchRequestHistory.failure):
      return [];
    default:
      return state;
  }
};

const requestAcceptPage = combineReducers({
  fetchRequest,
  fetchRequestResult,
  isDialogOpened,
  needAcceptance,
  fetchAllocationParameters,
  fetchRequestParameters,
  allocationParameterValues,
  comment,
  currentParameterValues,
  poolSuggestions,
  selectedPool,
  fetchHistory,
});

export default requestAcceptPage;
