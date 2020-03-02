import { AuthState } from '../../features/login-page/login-page';
import { LoginAction } from '../../../../redux/actions/login-action';
import actions from '../../../../redux/actions';
import { FormData } from '../../components/login-form/login-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from 'typesafe-actions';
import { LoginPage } from './login-page';

export const mapDispatchToProps = (dispatch: Function) => ({
  login: (params: AuthState) => dispatch(LoginAction.request(params)),
  toggleShowPwd: () => dispatch(actions.loginPage.toggleShowPwd()),
  toggleInvalidAuth: () => dispatch(actions.loginPage.toggleInvalidAuth()),
  updateFormValues: (data: FormData) => dispatch(actions.loginPage.updateFormValues(data)),
  resetLoginForm: () => dispatch(actions.loginPage.resetLoginForm()),
});

export const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.tokens && !!state.tokens.refreshToken,
  loginFormValues: state.loginPage.formValues,
  showPwd: state.loginPage.showPwd,
  showInvalidAuth: state.loginPage.showInvalidAuth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
