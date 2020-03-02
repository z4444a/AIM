import React from 'react';
import RegistrationForm from '../../components/registration-form/index';
import { mapDispatchToProps, mapStateToProps } from './index';

export type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

export class RegistrationPage extends React.PureComponent<Props> {
  public componentWillUnmount() {
    const { resetRegistrationForm } = this.props;
    resetRegistrationForm();
  }

  public render(): JSX.Element {
    const {
      value,
      updateFormValues,
      showPwd,
      toggleShowPwd,
      showPwdConfirm,
      toggleShowPwdConfirm,
    } = this.props;
    return (
      <RegistrationForm
        value={value}
        onValueChanged={updateFormValues}
        submitRegistration={this.handleRegistration}
        showPwd={showPwd}
        toggleShowPwd={toggleShowPwd}
        showPwdConfirm={showPwdConfirm}
        toggleShowPwdConfirm={toggleShowPwdConfirm}
      />
    );
  }

  private handleRegistration = () => {
    const { fetch, value } = this.props;
    fetch({
      login: value.login,
      password: value.pwd,
    });
  };
}
