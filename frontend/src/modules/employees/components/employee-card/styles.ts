import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'container' | 'formLine' | 'divider' | 'contentCenter'>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing.unit * 3,
      '& > div': {
        width: '100%',
        minWidth: theme.breakpoints.values.sm / 1.5,
        maxWidth: theme.breakpoints.values.sm / 1.5,
      },
    },
    formLine: {
      paddingTop: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
    divider: {
      margin: theme.spacing.unit * 2,
    },
    contentCenter: {
      textAlign: 'center',
      paddingBottom: theme.spacing.unit * 2,
    },
  });
