import React, { ReactNode } from 'react';
import { OptionsObject, WithSnackbarProps } from 'notistack';
import { history } from '../../../../redux/store/configureStore';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../i18n';
import { Route, Router, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { Path } from '../../../../commons/path';
import { blueGrey } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { Style } from './styles';
import moment from 'moment';
import GuestPage from '../../../guest-space/features/guest-page/index';
import PortalContainer from '../portal-container/index';
import Overlay from '../../../../commons/components/overlay/index';
import { mapStateToProps } from './index';

moment.locale('ru');

const themeConfig = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    secondary: {
      main: blueGrey[200],
    },
    primary: {
      main: blueGrey[100],
    },
  },
  overrides: {
    MUIDataTable: {
      paper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
      },
      responsiveScroll: {
        maxHeight: 'none',
      },
    },
  },
};

export type Props = Style & WithSnackbarProps & ReturnType<typeof mapStateToProps>;

const theme = createMuiTheme(themeConfig as ThemeOptions);

export let snackBarService: WithSnackbarProps;

export class AppContainer extends React.PureComponent<Props> {
  public componentDidMount() {
    const { enqueueSnackbar, closeSnackbar } = this.props;
    const defaultOptions: OptionsObject = {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    };
    snackBarService = {
      enqueueSnackbar: (message: string | React.ReactNode, options?: OptionsObject) =>
        enqueueSnackbar(message, (options = defaultOptions)),
      closeSnackbar,
    };
  }

  public render(): ReactNode {
    const { classes, overlayActive, overlayText } = this.props;
    return (
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils} locale={'ru'} moment={moment}>
                <div className={classes.root}>
                  <Overlay active={overlayActive} text={overlayText} />
                  <Switch>
                    <Route path={Path.LOGIN} component={GuestPage} />
                    <Route path={Path.DEFAULT} component={PortalContainer} />
                  </Switch>
                </div>
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </ConnectedRouter>
        </Router>
      </I18nextProvider>
    );
  }
}
