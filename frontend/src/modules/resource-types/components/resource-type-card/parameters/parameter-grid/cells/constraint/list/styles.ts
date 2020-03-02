import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      paddingTop: '14px',
      paddingBottom: '28px',
      display: 'flex',
      justifyContent: 'center',
    },
    buttonOnError: {
      color: 'red',
    },
  });

export type Style = WithStyles<'buttonContainer' | 'buttonOnError'>;
