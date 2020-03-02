import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export const styles = createStyles({
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export type Style = WithStyles<'container' | 'spinnerContainer'>;
