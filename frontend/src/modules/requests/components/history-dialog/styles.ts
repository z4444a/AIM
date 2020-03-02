import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'flex' | 'paper'>;

export const styles = (theme: Theme) =>
  createStyles({
    flex: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    paper: {
      minWidth: 600,
    },
  });
