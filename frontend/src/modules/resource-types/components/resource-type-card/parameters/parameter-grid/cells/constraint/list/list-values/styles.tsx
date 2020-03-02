import { createStyles, WithStyles } from '@material-ui/core';

export const styles = () =>
  createStyles({
    root: {
      maxHeight: 200,
    },
  });

export type Style = WithStyles<'root'>;
