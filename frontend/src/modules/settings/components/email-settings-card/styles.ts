import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<
  | 'main'
  | 'btnContainer'
  | 'formLine'
  | 'dateRangeContainer'
  | 'blockTextField'
  | 'extTextField'
  | 'noParamsMessageContainer'
  | 'header'
  | 'container'
>;

export const styles = (theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing.unit * 2,
    },
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
    header: {
      paddingLeft: theme.spacing.unit * 2,
    },
    formLine: {
      paddingTop: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
    blockTextField: {
      marginRight: theme.spacing.unit * 2,
      width: '100%',
    },
    extTextField: {
      display: 'inline-flex',
      width: '36%',
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 2,
    },
    dateRangeContainer: {
      display: 'flex',
      '& > div:first-child': {
        marginRight: theme.spacing.unit * 3,
      },
    },
    noParamsMessageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '4em',
    },
  });
