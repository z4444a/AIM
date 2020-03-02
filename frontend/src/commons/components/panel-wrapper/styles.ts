import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    },
  });

export type Style = WithStyles<'container'>;
