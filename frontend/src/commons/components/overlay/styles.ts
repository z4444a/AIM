import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      zIndex: 10000,
      backgroundColor: 'rgba(100,100,100,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export type Style = WithStyles<'container' | 'innerContainer'>;
