import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router';
import { Path } from '../../../../commons/path';
import { RootState } from 'typesafe-actions';
import { Role } from '../../../../commons/role';

interface RequiredRole {
  requiredRoles: Role[];
}

const mapStateToProps = (state: RootState) => ({
  role: state.tokens && state.tokens.user ? state.tokens.user.role : Role.USER,
});

type Props = ReturnType<typeof mapStateToProps> & RequiredRole;
class RouteProtector extends React.Component<Props> {
  public render(): ReactNode {
    const { requiredRoles, role } = this.props;
    if (requiredRoles.indexOf(role) >= 0 || Role.ADMIN === role) {
      return <Switch>{this.props.children}</Switch>;
    }
    return <Redirect to={Path.DEFAULT} />;
  }
}

export default connect(
  mapStateToProps,
  null
)(RouteProtector);
