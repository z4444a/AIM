import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    field: {
      height: '50px',
    },
    bottomField: {
      marginTop: theme.spacing.unit * 2,
    },
  });

export type Style = WithStyles<'field' | 'bottomField'>;
