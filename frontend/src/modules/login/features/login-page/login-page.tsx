import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { CurrentUser } from '../../../../model/current-user';
import LoginForm from '../../components/login-form/index';
import { Path } from '../../../../commons/path';
import { mapDispatchToProps, mapStateToProps } from './index';

export interface AuthenticationProps {
  accessToken: string | null;
  refreshToken: string | null;
  error: boolean;
  user: CurrentUser | null;
}

export interface AuthState {
  login: string;
  password: string;
}

export interface LoadingStatus {
  firstUserExists: boolean | null;
}

export type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

export class LoginPage extends React.PureComponent<Props> {
  public componentWillUnmount() {
    const { resetLoginForm } = this.props;
    resetLoginForm();
  }

  public render(): JSX.Element {
    const {
      isAuthenticated,
      loginFormValues,
      showPwd,
      showInvalidAuth,
      updateFormValues,
      toggleShowPwd,
      toggleInvalidAuth,
      history,
    } = this.props;
    if (isAuthenticated) {
      const locationState = history.location.state;
      const from = locationState ? locationState.from : Path.DEFAULT;
      return <Redirect to={from} />;
    }
    return (
      <LoginForm
        value={loginFormValues}
        showPwd={showPwd}
        showInvalidAuth={showInvalidAuth}
        onValueChanged={updateFormValues}
        toggleShowPwd={toggleShowPwd}
        toggleInvalidAuth={toggleInvalidAuth}
        submitLogin={this.handleLogin}
      />
    );
  }

  private handleLogin = () => {
    const { login, loginFormValues } = this.props;
    login({
      login: loginFormValues.login,
      password: loginFormValues.pwd,
    });
  };
}
