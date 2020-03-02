import { createAction, createAsyncAction } from 'typesafe-actions';
import { RequestAsync } from './action-types';
import PageModel from '../../model/base/page-model';
import RequestModel from '../../model/get/request-model';
import { RequestParams } from '../../model/parameters/request-params';

export const fetchAllRequests = createAsyncAction(
  RequestAsync.GET_ALL,
  RequestAsync.GET_ALL_SUCCESS,
  RequestAsync.GET_ALL_FAILURE
)<RequestParams | undefined, PageModel<RequestModel>, Error>();

export const setRequestsPageFilterParam = createAction(
  'REQUESTS_PAGE/SET_FILTER',
  action => (data: RequestParams) => action(data)
);
