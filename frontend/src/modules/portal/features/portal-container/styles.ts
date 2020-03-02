import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { StyleRules } from '@material-ui/core/styles';

export const styles = (theme: Theme): StyleRules =>
  createStyles({
    content: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    mainContainer: {
      width: '100vw',
      height: '100vh',
    },
    bodyContainer: {
      display: 'flex',
      height: 'calc(100% - 64px)',
      marginTop: '64px',
    },
  });

export type Style = WithStyles<'content' | 'toolbar' | 'mainContainer' | 'bodyContainer'>;
