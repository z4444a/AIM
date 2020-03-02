import React, { KeyboardEvent } from 'react';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '../../../../commons/components/alert/index';
import { Style } from './styles';
import { WithTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

export type InternalProps = Style & Props & WithTranslation;

export interface FormData {
  login: string;
  pwd: string;
}

export interface Props {
  value: FormData;
  onValueChanged?: (newValue: FormData) => void;
  submitLogin?: (value: FormData) => void;
  showPwd: boolean;
  toggleShowPwd?: (showPwd: boolean) => void;
  showInvalidAuth: boolean;
  toggleInvalidAuth?: (showInvalidAuth: boolean) => void;
}

type InputType = keyof FormData;

export class LoginForm extends React.PureComponent<InternalProps> {
  private handleValueChanged(inputType: InputType, event: React.ChangeEvent<HTMLInputElement>) {
    const { value, onValueChanged } = this.props;
    if (typeof onValueChanged !== 'function') {
      return;
    }
    const newValue: FormData = Object.assign({}, value);
    newValue[inputType] = event.target.value;

    onValueChanged(newValue);
  }

  private handleKeyPress(inputType: InputType, event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submitLogin();
      event.preventDefault();
    }
  }

  private handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.handleValueChanged('login', event);
  private handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.handleValueChanged('pwd', event);
  private handleLoginKeyPress = (event: KeyboardEvent) => this.handleKeyPress('login', event);
  private handlePwdKeyPress = (event: KeyboardEvent) => this.handleKeyPress('pwd', event);
  private toggleShowPwd = () => {
    const { showPwd, toggleShowPwd } = this.props;
    if (typeof toggleShowPwd !== 'function') {
      return;
    }
    toggleShowPwd(!showPwd);
  };
  private submitLogin = () => {
    const { submitLogin, value } = this.props;
    if (typeof submitLogin !== 'function') {
      return;
    }
    submitLogin(value);
  };
  private toggleInvalidAuth = () => {
    const { showInvalidAuth, toggleInvalidAuth } = this.props;
    if (typeof toggleInvalidAuth !== 'function') {
      return;
    }
    toggleInvalidAuth(!showInvalidAuth);
  };

  public render(): JSX.Element {
    const { classes, value, showPwd, showInvalidAuth, t } = this.props;
    const loginValue = value ? value.login : '';
    const pwdValue = value ? value.pwd : '';
    return (
      <div className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Card className={classes.card}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography classes={{ root: classes.greeting }} component="h1" variant="h6">
              {t('loginPage.form.header')}
            </Typography>
            {showInvalidAuth && (
              <Alert type="error" message={t('loginPage.errorMsg.invalidLoginPwd')} />
            )}
            <form className={classes.form} noValidate>
              <TextField
                id="login"
                error={showInvalidAuth}
                autoFocus
                fullWidth
                required
                label={t('loginPage.form.loginFieldLabel')}
                margin="dense"
                variant="outlined"
                value={loginValue}
                onChange={this.handleLoginChange}
                onKeyPress={this.handleLoginKeyPress}
              />
              <TextField
                id="password"
                error={showInvalidAuth}
                value={pwdValue}
                fullWidth
                required
                label={t('loginPage.form.pwdFieldLabel')}
                margin="dense"
                variant="outlined"
                onChange={this.handlePwdChange}
                onKeyPress={this.handlePwdKeyPress}
                type={showPwd ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                        onClick={this.toggleShowPwd}
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={this.submitLogin}
              >
                {t('loginPage.form.submitBtn')}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}
