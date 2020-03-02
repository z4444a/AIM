import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import resourceTypesReducer from './resource-types-reducer';
import resourcePoolReducer from './resource-pool-reducer';
import authReducer from './login-reducer';
import checkRegistrationReducer from './check-registration-reducer';
import employeeReducer from './employee-reducer';
import poolCardReducer from './pool-card-reducer';
import resourceTypesActiveReducer from './resource-type-active-reducer';
import requestsReducer from './requests-reducer';
import resourceTypeSuggestionReducer from './resource-types-suggestion-reducer';
import poolUpdateReducer from './pool-update-reducer';
import ownersTypesChartReducer from './owners-types-chart-reducer';
import employeesReducer from './full-employee-reducer';
import getEmployeeReducer from './get-employee-reducer';
import projectPageReducer from './project-suggestion-reducers';
import portalReducer from './portal-reducer';
import loginPageReducer from './login-page-reducer';
import registrationPageReducer from './registration-page-reducer';
import requestCreatePage from './request-create-page-reducer';
import resourceTypePage from './resource-type-page-reducer';
import resourcePoolCreatePage from './resource-pool-create-page-reducer';
import requestAcceptPage from './request-accept-page-reducer';
import getSettingsReducer from './settings-reducer';
import settingsPage from './settings-page-reducer';
import requestFilterPanel from './request-filter-panel-reducer';
import poolFilterPanel from './pool-filter-panel-reducer';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    resourceTypes: resourceTypesReducer,
    resourcePool: resourcePoolReducer,
    requests: requestsReducer,
    tokens: authReducer,
    reg: checkRegistrationReducer,
    resourceTypeSuggestions: resourceTypeSuggestionReducer,
    pool: poolCardReducer,
    employees: employeeReducer,
    resourceActiveTypes: resourceTypesActiveReducer,
    updatePool: poolUpdateReducer,
    ownersTypesChart: ownersTypesChartReducer,
    fullEmployees: employeesReducer,
    chosenEmployee: getEmployeeReducer,
    projectPage: projectPageReducer,
    portal: portalReducer,
    loginPage: loginPageReducer,
    registrationPage: registrationPageReducer,
    requestCreatePage: requestCreatePage,
    resourceTypePage: resourceTypePage,
    resourcePoolCreatePage: resourcePoolCreatePage,
    requestAcceptPage: requestAcceptPage,
    settings: getSettingsReducer,
    settingsPage: settingsPage,
    requestFilterPanel: requestFilterPanel,
    poolFilterPanel: poolFilterPanel,
  });

export default rootReducer;
