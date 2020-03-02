import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'container'>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing.unit * 3,
      '& > div': {
        width: '100%',
        minWidth: theme.breakpoints.values.sm,
        maxWidth: theme.breakpoints.values.md,
      },
    },
  });
