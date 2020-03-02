import { fetchFullEmployees } from '../../../../redux/actions/full-employee-action';
import { push } from 'connected-react-router';
import { SynchronizeAction } from '../../../../redux/actions/synchronize-action';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { EmployeesPage } from './employees-page';
import { withTranslation } from 'react-i18next';
import { toggleEmployeePageFilterPanel } from '../../../../redux/actions/portal-actions';
import { EmployeeParams } from '../../../../model/parameters/employee-params';

export const mapStateToProps = (state: RootState) => ({
  page: state.fullEmployees.page,
  params: state.fullEmployees.params,
  showFilterPanel: state.portal.employeePageFilterPanelOpen,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  fetch: (params?: EmployeeParams) => dispatch(fetchFullEmployees.request(params)),
  redirect: (path: string) => dispatch(push(path)),
  sync: (params?: EmployeeParams) => dispatch(SynchronizeAction.request(params)),
  toggleFilterPanel: (showFilterPanel: boolean) =>
    dispatch(toggleEmployeePageFilterPanel(showFilterPanel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(EmployeesPage));
