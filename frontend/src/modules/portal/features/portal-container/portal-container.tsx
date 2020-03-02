import React from 'react';
import Header from '../header/index';
import MuiBreadcrumbs from '../../../../commons/components/breadcrumbs/mui-breadcrumbs';
import AuthGuard from '../auth-guard/index';
import { Style } from './styles';
import { Redirect, Route, Switch } from 'react-router';
import { Path } from '../../../../commons/path';
import Resources from '../../../resources';
import Chart from '../../../resource-pool/chart/chart';
import RouteProtector from '../route-protector/route-protector';
import { Role } from '../../../../commons/role';
import EmployeesPage from '../../../employees/features/employees-page/index';
import SideBar from '../side-bar/index';
import ResourcePoolPage from '../../../resource-pool/features/resource-pool-grid-page/index';
import ResourceTypesPage from '../../../resource-types/features/resource-types-page/index';
import RequestsPage from '../../../requests/features/requests-page/index';
import TypeCreatePage from '../../../resource-types/features/create-type-page/index';
import UpdateTypePage from '../../../resource-types/features/update-type-page/index';
import RequestCreatePage from '../../../requests/features/request-create-page/index';
import ResourcePoolCreatePage from '../../../resource-pool/features/resource-pool-create-page/index';
import ResourcePoolUpdatePage from '../../../resource-pool/features/resource-pool-update-page/index';
import RequestAcceptPage from '../../../requests/features/request-accept-page';
import EmployeeChangeRolePage from '../../../employees/features/employee-change-role-page/index';
import SettingsPage from '../../../settings/feature/settings-page/index';

export type Props = Style;

export class PortalContainer extends React.Component<Props> {
  public render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <AuthGuard>
        <div className={classes.mainContainer}>
          <Header>
            <MuiBreadcrumbs />
          </Header>
          <div className={classes.bodyContainer}>
            <SideBar />
            <main className={classes.content}>{this.getRoutes()}</main>
          </div>
        </div>
      </AuthGuard>
    );
  }

  private getRoutes(): React.ReactNode {
    return (
      <Switch>
        <Redirect exact path={Path.DEFAULT} to={Path.REQUESTS} />
        <Route exact path={Path.REQUEST_CREATE} component={RequestCreatePage} />
        <Route exact path={Path.REQUEST_CARD} component={RequestAcceptPage} />
        <Route exact path={Path.REQUESTS} component={RequestsPage} />
        <Route exact path={Path.RESOURCES} component={Resources} />
        <RouteProtector requiredRoles={[Role.ADMIN, Role.POOL_CREATOR, Role.POOL_OWNER]}>
          <Route exact path={Path.RESOURCE_POOL_CHART} component={Chart} />
          <Route exact path={Path.RESOURCE_POOLS} component={ResourcePoolPage} />
          <RouteProtector requiredRoles={[Role.ADMIN, Role.POOL_CREATOR]}>
            <Route exact path={Path.RESOURCE_POOL_CREATE} component={ResourcePoolCreatePage} />
            <Route exact path={Path.RESOURCE_POOL_UPDATE} component={ResourcePoolUpdatePage} />
            <RouteProtector requiredRoles={[Role.ADMIN]}>
              <Route exact path={Path.RESOURCE_TYPE_CREATE} component={TypeCreatePage} />
              <Route exact path={Path.RESOURCE_TYPE_UPDATE} component={UpdateTypePage} />
              <Route exact path={Path.RESOURCE_TYPES} component={ResourceTypesPage} />
              <Route exact path={Path.EMPLOYEE_CARD} component={EmployeeChangeRolePage} />
              <Route exact path={Path.EMPLOYEES} component={EmployeesPage} />
              <Route exact path={Path.SETTINGS} component={SettingsPage} />
              <Redirect path={Path.DEFAULT} to={Path.REQUESTS} />
            </RouteProtector>
            <Redirect path={Path.DEFAULT} to={Path.REQUESTS} />
          </RouteProtector>
          <Redirect path={Path.DEFAULT} to={Path.REQUESTS} />
        </RouteProtector>
        <Redirect path={Path.DEFAULT} to={Path.REQUESTS} />
      </Switch>
    );
  }
}
