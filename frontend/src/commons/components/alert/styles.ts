import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { amber, green } from '@material-ui/core/colors';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.light,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  });

export type Style = WithStyles<
  'success' | 'error' | 'info' | 'warning' | 'icon' | 'iconVariant' | 'message' | 'container'
>;
