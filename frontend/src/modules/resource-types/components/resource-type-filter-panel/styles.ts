import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'container'>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
  });
