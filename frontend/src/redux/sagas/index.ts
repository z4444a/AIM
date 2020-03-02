import { fork } from 'redux-saga/effects';
import {
  watchFetchAllActiveResourceTypes,
  watchFetchAllResourceTypes,
  watchFetchResourceType,
  watchFetchResourceTypeSuggestion,
} from './resource-type-saga';
import {
  watchIdentifierExistence,
  watchIsParameterUsed,
  watchRequestAllParameters,
} from './parameter-saga';
import { watchFetchLogin } from './login-saga';
import { watchFetchRegistration } from './registration-saga';
import { watchCheckRegistration } from './check-registration-saga';
import { watchFetchAllResourcePool } from './resource-pool-saga';
import {
  updatePoolByData,
  watchFetchPool,
  watchFetchPoolAllocationSuggestions,
  watchFetchPoolTypedSuggestions,
} from './pool-saga';
import { watchFetchAllEmployees, watchFetchEmployee } from './employee-saga';
import {
  watchAcceptRequest,
  watchCloseRequest,
  watchFetchAllRequests,
  watchFetchHistory,
  watchFetchRequest,
  watchFetchValues,
  watchPauseRequest,
  watchRejectRequest,
  watchResumeRequest,
} from './request-saga';
import { watchFetchOwnersTypesChart } from './owners-types-chart-saga';
import { watchFetchFullEmployees } from './full-employee-saga';
import { watchSync } from './synchronize-saga';
import { watchChangeRole } from './change-role-saga';
import { watchFetchProjectPage } from './project-saga';
import { watchLogout } from './logout-saga';
import { checkTypeByName, createTypeByData, watchFetchType, watchUpdateType } from './type-saga';
import {
  watchCreateNewRequest,
  watchCreateRequestAuthorSuggestion,
  watchCreateRequestResourceTypeSuggestion,
  watchFetchProjectSuggestions,
} from './request-create-page-saga';
import {
  watchCreateNewResourcePool,
  watchCreateResPoolResourceTypeSuggestion,
} from './resource-pool-create-page-saga';
import { watchLeaveComment } from './comment-saga';
import { watchFetchSettingsByGroup, watchSaveSettings } from './settings-saga';
import { watchRequestFilterPanelTypeSuggestion } from './request-filter-panel-saga';

function* rootSaga() {
  yield fork(watchFetchAllResourceTypes);
  yield fork(watchFetchResourceType);
  yield fork(watchRequestAllParameters);
  yield fork(watchFetchLogin);
  yield fork(watchFetchRegistration);
  yield fork(watchCheckRegistration);
  yield fork(watchFetchAllResourcePool);
  yield fork(watchFetchAllActiveResourceTypes);
  yield fork(watchFetchAllEmployees);
  yield fork(watchFetchPool);
  yield fork(updatePoolByData);
  yield fork(watchFetchAllRequests);
  yield fork(watchFetchResourceTypeSuggestion);
  yield fork(watchCreateRequestResourceTypeSuggestion);
  yield fork(watchCreateRequestAuthorSuggestion);
  yield fork(watchCreateNewRequest);
  yield fork(watchFetchOwnersTypesChart);
  yield fork(watchFetchFullEmployees);
  yield fork(watchSync);
  yield fork(watchChangeRole);
  yield fork(watchFetchProjectPage);
  yield fork(watchLogout);
  yield fork(createTypeByData);
  yield fork(watchFetchType);
  yield fork(watchUpdateType);
  yield fork(watchCreateResPoolResourceTypeSuggestion);
  yield fork(watchCreateNewResourcePool);
  yield fork(watchFetchRequest);
  yield fork(watchAcceptRequest);
  yield fork(watchRejectRequest);
  yield fork(watchLeaveComment);
  yield fork(watchFetchEmployee);
  yield fork(watchFetchValues);
  yield fork(watchFetchSettingsByGroup);
  yield fork(watchSaveSettings);
  yield fork(watchFetchProjectSuggestions);
  yield fork(watchFetchPoolAllocationSuggestions);
  yield fork(watchRequestFilterPanelTypeSuggestion);
  yield fork(checkTypeByName);
  yield fork(watchPauseRequest);
  yield fork(watchCloseRequest);
  yield fork(watchResumeRequest);
  yield fork(watchFetchHistory);
  yield fork(watchIsParameterUsed);
  yield fork(watchFetchPoolTypedSuggestions);
  yield fork(watchIdentifierExistence);
}

export default rootSaga;
