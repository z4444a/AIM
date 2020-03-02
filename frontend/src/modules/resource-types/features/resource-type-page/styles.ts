import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      '& > div': {
        width: '95%',
        minWidth: theme.breakpoints.values.sm,
      },
    },
  });

export type Style = WithStyles<'container'>;
