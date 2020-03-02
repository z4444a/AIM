import React, { KeyboardEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Style } from './styles';
import { WithTranslation } from 'react-i18next';

export interface FormData {
  login: string;
  pwd: string;
  confirmPwd: string;
}

type InputType = keyof FormData;

export interface Props {
  value: FormData;
  onValueChanged?: (newValue: FormData) => void;
  submitRegistration?: (newValue: FormData) => void;
  showPwd: boolean;
  toggleShowPwd?: (showPwd: boolean) => void;
  showPwdConfirm: boolean;
  toggleShowPwdConfirm?: (showPwd: boolean) => void;
}

interface State {
  isPwdConfirmFieldDirty: boolean;
}

export type InternalProps = Style & Props & WithTranslation;

export class RegistrationForm extends React.PureComponent<InternalProps, State> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      isPwdConfirmFieldDirty: false,
    };
  }

  public render(): JSX.Element {
    const { classes, value, showPwd, showPwdConfirm, t } = this.props;
    const { isPwdConfirmFieldDirty } = this.state;
    return (
      <div className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Card className={classes.card}>
            <Avatar className={classes.avatar}>
              <SupervisorAccount />
            </Avatar>
            <Typography classes={{ root: classes.greeting }} component="h1" variant="h6">
              {t('registrationPage.form.header')}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                id="login"
                label={t('registrationPage.form.loginFieldLabel')}
                fullWidth
                autoFocus
                required
                margin="dense"
                variant="outlined"
                value={value.login}
                onChange={this.handleLoginChange}
                onKeyPress={this.handleLoginKeyPress}
              />
              <TextField
                id="password"
                value={value.pwd}
                fullWidth
                required
                label={t('registrationPage.form.pwdFieldLabel')}
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
              <TextField
                id="passwordConfirm"
                value={value.confirmPwd}
                fullWidth
                required
                label={t('registrationPage.form.pwdConfirmFieldLabel')}
                margin="dense"
                variant="outlined"
                onChange={this.handlePwdConfirmChange}
                onKeyPress={this.handlePwdConfirmKeyPress}
                type={showPwdConfirm ? 'text' : 'password'}
                error={value.pwd !== value.confirmPwd && isPwdConfirmFieldDirty}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                        onClick={this.toggleShowPwdConfirm}
                      >
                        {showPwdConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                className={classes.submit}
                fullWidth
                variant="contained"
                onClick={this.submitRegistration}
                disabled={!value.login || !value.pwd || value.pwd !== value.confirmPwd}
              >
                {t('registrationPage.form.submitBtn')}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

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
      this.submitRegistration();
      event.preventDefault();
    }
  }

  private submitRegistration = () => {
    const { submitRegistration, value } = this.props;
    if (typeof submitRegistration !== 'function') {
      return;
    }
    submitRegistration(value);
  };

  private handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.handleValueChanged('login', event);
  private handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.handleValueChanged('pwd', event);
  private handlePwdConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.handleValueChanged('confirmPwd', event);
  private handleLoginKeyPress = (event: KeyboardEvent) => this.handleKeyPress('login', event);
  private handlePwdKeyPress = (event: KeyboardEvent) => this.handleKeyPress('pwd', event);
  private handlePwdConfirmKeyPress = (event: KeyboardEvent) => {
    this.setState({ isPwdConfirmFieldDirty: true });
    this.handleKeyPress('confirmPwd', event);
  };
  private toggleShowPwd = () => {
    const { showPwd, toggleShowPwd } = this.props;
    if (typeof toggleShowPwd !== 'function') {
      return;
    }
    toggleShowPwd(!showPwd);
  };
  private toggleShowPwdConfirm = () => {
    const { showPwdConfirm, toggleShowPwdConfirm } = this.props;
    if (typeof toggleShowPwdConfirm !== 'function') {
      return;
    }
    toggleShowPwdConfirm(!showPwdConfirm);
  };
}
