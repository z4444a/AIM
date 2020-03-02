import React, { ReactNode } from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import Info from '@material-ui/icons/Info';
import Warning from '@material-ui/icons/Warning';
import { Style } from './styles';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

export interface Props {
  message?: string;
  type: AlertType;
}

export type AlertType = 'success' | 'warning' | 'error' | 'info';
export type InternalProps = Style & Props;

export class Alert extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { classes, type, message } = this.props;
    const Icon = variantIcon[type];
    return (
      <SnackbarContent
        className={`${classes[type]} ${classes.container}`}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={`${classes.icon} ${classes.iconVariant}`} />
            {message}
          </span>
        }
      />
    );
  }
}
