import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'container' | 'spinnerContainer'>;

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
    spinnerContainer: {
      display: 'flex',
      width: '90vw',
      height: '90vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
