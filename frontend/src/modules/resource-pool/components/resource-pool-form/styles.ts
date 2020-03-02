import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<
  | 'container'
  | 'btnContainer'
  | 'formLine'
  | 'dateRangeContainer'
  | 'resourceTypeLine'
  | 'blockTextField'
  | 'extTextField'
  | 'noParamsMessageContainer'
  | 'composeLine'
  | 'checkBoxLeft'
  | 'checkBoxRight'
>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing.unit * 2,
    },
    formLine: {
      paddingTop: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    checkBoxLeft: {
      paddingTop: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 4,
    },
    checkBoxRight: {
      paddingTop: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
    },
    blockTextField: {
      marginRight: theme.spacing.unit * 2,
      width: '15%',
    },
    extTextField: {
      maxWidth: '25%',
    },
    composeLine: {
      display: 'inline-flex',
      width: '100%',
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing.unit * 3,
    },
    dateRangeContainer: {
      display: 'flex',
      '& > div:first-child': {
        marginRight: theme.spacing.unit * 3,
      },
    },
    resourceTypeLine: {
      paddingTop: theme.spacing.unit * 3,
    },
    noParamsMessageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '4em',
    },
  });
