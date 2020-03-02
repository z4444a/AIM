import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core';

export const styles = () =>
  createStyles({
    lighted: {
      color: 'red',
    },
  });

export type Style = WithStyles<'lighted'>;
