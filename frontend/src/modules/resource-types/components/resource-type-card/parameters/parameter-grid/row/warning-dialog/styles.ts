import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    flexBetween: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.unit * 2,
    },
    flexCenter: {
      color: 'red',
      justifyContent: 'center',
      display: 'flex',
    },
  });

export type Style = WithStyles<'flexBetween' | 'flexCenter'>;
