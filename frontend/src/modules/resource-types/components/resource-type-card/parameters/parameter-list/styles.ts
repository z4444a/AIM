import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    parameterContainer: {
      width: '50%',
      padding: theme.spacing.unit,
    },
    details: {
      flexDirection: 'column',
      '& *': {
        border: 'none',
      },
    },
    row: {
      marginTop: theme.spacing.unit * 2,
    },
    expansionPanel: {
      width: '100%',
      boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.2)',
    },
    noParamsMessageContainer: {
      textAlign: 'center',
    },
  });

export type Style = WithStyles<
  | 'mainContainer'
  | 'parameterContainer'
  | 'details'
  | 'expansionPanel'
  | 'row'
  | 'noParamsMessageContainer'
>;
