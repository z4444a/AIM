import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'container' | 'checkBox' | 'mediumSize'>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    checkBox: {
      marginLeft: 0,
      marginTop: theme.spacing.unit,
    },
    mediumSize: {
      fontSize: '16px',
    },
  });
