import { createStyles, WithStyles } from '@material-ui/core';

export const styles = createStyles({
  root: {
    display: 'flex',
  },
});

export type Style = WithStyles<'root'>;
