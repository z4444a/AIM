import { AuthState } from '../../../login/features/login-page/login-page';
import { RegistrationAction } from '../../../../redux/actions/registration-action';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { RegistrationPage } from './registration-page';
import { FormData } from '../../components/registration-form/registration-form';
import actions from '../../../../redux/actions/index';

export const mapStateToProps = (state: RootState) => ({
  value: state.registrationPage.formValues,
  showPwd: state.registrationPage.showPwd,
  showPwdConfirm: state.registrationPage.showPwdConfirm,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  fetch: (params: AuthState) => dispatch(RegistrationAction.request(params)),
  updateFormValues: (data: FormData) => dispatch(actions.registrationPage.updateFormValues(data)),
  toggleShowPwd: () => dispatch(actions.registrationPage.toggleShowPwd()),
  toggleShowPwdConfirm: () => dispatch(actions.registrationPage.toggleShowPwdConfirm()),
  resetRegistrationForm: () => dispatch(actions.registrationPage.resetRegistrationForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);
