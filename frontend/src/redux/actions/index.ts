import * as loginActions from './login-action';
import * as loadingActions from './loading-actions';
import * as registrationActions from './registration-action';
import * as employeeActions from './employee_action';
import * as fullEmployeeActions from './full-employee-action';
import * as ownersTypesChartActions from './owners-types-chart';
import * as poolActions from './pool-action';
import * as projectActions from './project-actions';
import * as requestActions from './request-actions';
import * as resourcePoolActions from './resource-pool-actions';
import * as resourceTypeActions from './resource-type-actions';
import * as synchronizeActions from './synchronize-action';
import * as portalActions from './portal-actions';
import * as logoutActions from './logout-actions';
import * as loginPageActions from './login-page-actions';
import * as registrationPageActions from './registration-page-actions';
import * as typeActions from './type-action';
import * as requestCreatePageActions from './request-create-page-actions';
import * as resourceTypePageActions from './resource-type-page-actions';
import * as resourcePoolCreatePageActions from './resource-pool-create-page-actions';
import * as requestAcceptPageActions from './request-accept-page-action';
import * as commentActions from './comment-actions';
import * as settingsActions from './settings-actions';
import * as settingsPageActions from './settings-page-actions';
import * as requestFilterPanel from './request-filter-panel-actions';
import * as poolsFilterPanel from './pool-filter-panel-actions';

export default {
  login: loginActions,
  logout: logoutActions,
  registration: registrationActions,
  loading: loadingActions,
  employee: employeeActions,
  fullEmployee: fullEmployeeActions,
  ownersTypesChart: ownersTypesChartActions,
  pool: poolActions,
  project: projectActions,
  request: requestActions,
  resourcePool: resourcePoolActions,
  resourceType: resourceTypeActions,
  synchronize: synchronizeActions,
  portal: portalActions,
  loginPage: loginPageActions,
  registrationPage: registrationPageActions,
  type: typeActions,
  requestCreatePage: requestCreatePageActions,
  requestAcceptPage: requestAcceptPageActions,
  requestFilterPanel: requestFilterPanel,
  poolsFilterPanel: poolsFilterPanel,
  resourceTypePage: resourceTypePageActions,
  resourcePoolCreatePageActions: resourcePoolCreatePageActions,
  comment: commentActions,
  settings: settingsActions,
  settingsPage: settingsPageActions,
};
