import React, { ReactNode } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Path } from '../../../../commons/path';
import { mapStateToProps } from './index';

export type Props = RouteComponentProps & { children: ReactNode } & ReturnType<
    typeof mapStateToProps
  >;

export class AuthGuard extends React.PureComponent<Props> {
  public render(): ReactNode {
    const { isAuthenticated, children, history } = this.props;
    if (isAuthenticated) {
      return children;
    }
    const from = history.location.pathname;
    return (
      <Redirect
        to={{
          pathname: Path.LOGIN,
          state: {
            from: from,
          },
        }}
      />
    );
  }
}
