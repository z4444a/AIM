import { createStyles, Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing.unit * 2,
      '& > div': {
        marginTop: theme.spacing.unit * 2,
      },
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    completeButton: {
      marginLeft: theme.spacing.unit * 2,
    },
  });

export type Style = WithStyles<'container' | 'buttonGroup' | 'completeButton'>;
