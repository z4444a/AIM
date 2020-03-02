import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export type Style = WithStyles<'appBar' | 'toolbar' | 'menuButton' | 'emptySpace'>;

export const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'fixed',
      zIndex: 1400,
    },
    toolbar: theme.mixins.toolbar,
    menuButton: {
      marginRight: 36,
    },
    emptySpace: {
      flexGrow: 1,
    },
  });
