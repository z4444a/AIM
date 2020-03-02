import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'buttonsPosition' | 'textInput' | 'paper'>;

export const styles = (theme: Theme) =>
  createStyles({
    textInput: {
      minWidth: '95%',
    },
    buttonsPosition: {
      paddingTop: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    paper: {
      minWidth: 400,
    },
  });
