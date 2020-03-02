import { createAction, createAsyncAction } from 'typesafe-actions';
import RequestModel from '../../model/get/request-model';
import { CommentCreateModel } from '../../model/create/comment-create-model';
import { GenericFormValue } from '../../commons/components/generic-fields/models/field-config.model';
import { RequestAcceptanceModel } from '../../model/update/request-acceptance-model';
import NamedModel from '../../model/base/named-model';
import FullParameterModel from '../../model/get/full-parameter-model';
import { RequestStatusChangeGetModel } from '../../model/get/request-status-change-get-model';
import { NamedTypedModel } from '../../model/get/named-typed-model';
import { ParameterParameters } from '../../model/parameters/parameter-parameters';
import { ParameterValueFormModel } from '../../model/form/parameter-value-form-model';

export const fetchRequestAction = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/FETCH_REQUEST',
  'REQUEST_ACCEPT_PAGE/FETCH_REQUEST_SUCCESS',
  'REQUEST_ACCEPT_PAGE/FETCH_REQUEST_FAILURE'
)<number, RequestModel, Error>();
export const resetRequest = createAction('REQUEST_ACCEPT_PAGE/RESET_REQUEST');

export const acceptRequestAction = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/ACCEPT_REQUEST',
  'REQUEST_ACCEPT_PAGE/ACCEPT_REQUEST_SUCCESS',
  'REQUEST_ACCEPT_PAGE/ACCEPT_REQUEST_FAILURE'
)<RequestAcceptanceModel, void, Error>();

export const poolCapacityIsNotEnough = createAction('REQUEST_ACCEPT_PAGE/CAPACITY_IS_NOT_ENOUGH');
export const defaultState = createAction('REQUEST_ACCEPT_PAGE/DEFAULT_STATE');

export const rejectRequestAction = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/REJECT_REQUEST',
  'REQUEST_ACCEPT_PAGE/REJECT_REQUEST_SUCCESS',
  'REQUEST_ACCEPT_PAGE/REJECT_REQUEST_FAILURE'
)<CommentCreateModel, void, Error>();

export const pauseRequestAction = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/PAUSE_REQUEST',
  'REQUEST_ACCEPT_PAGE/PAUSE_REQUEST_SUCCESS',
  'REQUEST_ACCEPT_PAGE/PAUSE_REQUEST_FAILURE'
)<number, void, Error>();

export const closeRequestAction = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/CLOSE_REQUEST',
  'REQUEST_ACCEPT_PAGE/CLOSE_REQUEST_SUCCESS',
  'REQUEST_ACCEPT_PAGE/CLOSE_REQUEST_FAILURE'
)<number, void, Error>();

export const resumeRequestAction = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/RESUME_REQUEST',
  'REQUEST_ACCEPT_PAGE/RESUME_REQUEST_SUCCESS',
  'REQUEST_ACCEPT_PAGE/RESUME_REQUEST_FAILURE'
)<number, void, Error>();

export const showDialog = createAction('REQUEST_ACCEPT_PAGE/SHOW_DIALOG');
export const hideDialog = createAction('REQUEST_ACCEPT_PAGE/CLOSE_DIALOG');

export const setAcceptance = createAction('REQUEST_ACCEPT_PAGE/SET_ACCEPTANCE');
export const setRejection = createAction('REQUEST_ACCEPT_PAGE/SET_REJECTION');

export const updateDialogValues = createAction(
  'REQUEST_ACCEPT_PAGE/UPDATE_VALUES',
  action => (data: GenericFormValue) => action(data)
);
export const resetDialogValues = createAction('REQUEST_ACCEPT_PAGE/RESET_VALUES');

export const updateComment = createAction(
  'REQUEST_ACCEPT_PAGE/UPDATE_COMMENT',
  action => (data: string) => action(data)
);

export const resetComment = createAction('REQUEST_ACCEPT_PAGE/RESET_COMMENT');

export const fetchParameterValues = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/GET_PARAMETER_VALUES',
  'REQUEST_ACCEPT_PAGE/GET_PARAMETER_VALUES_SUCCESS',
  'REQUEST_ACCEPT_PAGE/GET_PARAMETER_VALUES_FAILURE'
)<number, ParameterValueFormModel[], Error>();
export const resetParameterValues = createAction('REQUEST_ACCEPT_PAGE/RESET_PARAMETER_VALUES');

export const selectPool = createAction(
  'REQUEST_ACCEPT_PAGE/SELECT_POOL',
  action => (data: NamedModel) => action(data)
);
export const resetSelectedPool = createAction('REQUEST_ACCEPT_PAGE/RESET_POOL');

export const fetchPoolAllocationSuggestions = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/GET_POOL_ALLOCATION_SUGGESTIONS',
  'REQUEST_ACCEPT_PAGE/GET_POOL_ALLOCATION_SUGGESTIONS_SUCCESS',
  'REQUEST_ACCEPT_PAGE/GET_POOL_ALLOCATION_SUGGESTIONS_FAILURE'
)<number, NamedModel[], Error>();

export const fetchPoolTypedSuggestions = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/GET_POOL_TYPED_SUGGESTIONS',
  'REQUEST_ACCEPT_PAGE/GET_POOL_TYPED_SUGGESTIONS_SUCCESS',
  'REQUEST_ACCEPT_PAGE/GET_POOL_TYPED_SUGGESTIONS_FAILURE'
)<number, NamedTypedModel[], Error>();

export const fetchRequestParametersAction = createAction(
  'REQUEST_ACCEPT_PAGE/FETCH_REQUEST_PARAMETERS',
  action => (data: FullParameterModel[]) => action(data)
);
export const fetchAllocationParametersAction = createAction(
  'REQUEST_ACCEPT_PAGE/FETCH_ALLOCATION_PARAMETERS',
  action => (data: FullParameterModel[]) => action(data)
);
export const fetchParametersRequest = createAction(
  'REQUEST_ACCEPT_PAGE/FETCH_PARAMETERS_REQUEST',
  action => (data: ParameterParameters) => action(data)
);

export const fetchRequestHistory = createAsyncAction(
  'REQUEST_ACCEPT_PAGE/FETCH_HISTORY',
  'REQUEST_ACCEPT_PAGE/FETCH_HISTORY_SUCCESS',
  'REQUEST_ACCEPT_PAGE/FETCH_HISTORY_FAILURE'
)<number, RequestStatusChangeGetModel[], Error>();
