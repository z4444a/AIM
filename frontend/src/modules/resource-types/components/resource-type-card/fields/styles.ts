import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    mainContainer: {
      '& > div': {
        marginTop: theme.spacing.unit * 2,
      },
    },
    imgContainer: {
      display: 'flex',
    },
    avatar: {
      marginRight: theme.spacing.unit,
    },
    checkbox: {
      display: 'inline-block',
    },
  });

export type Styles = WithStyles<'mainContainer' | 'avatar' | 'imgContainer' | 'checkbox'>;
