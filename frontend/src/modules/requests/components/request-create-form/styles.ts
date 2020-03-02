import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<
  | 'container'
  | 'btnContainer'
  | 'formLine'
  | 'dateRangeContainer'
  | 'amountField'
  | 'suggestLine'
  | 'creationButton'
>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing.unit * 2,
    },
    formLine: {
      paddingTop: theme.spacing.unit,
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
      whiteSpace: 'nowrap',
    },
    suggestLine: {
      paddingTop: theme.spacing.unit * 2,
      width: '40%',
    },
    amountField: {
      width: '100%',
    },
    creationButton: {
      marginLeft: theme.spacing.unit * 2,
    },
  });
