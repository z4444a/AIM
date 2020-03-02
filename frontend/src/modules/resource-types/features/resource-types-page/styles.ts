import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'scroll' | 'linkCursor'>;

export const styles = (theme: Theme) =>
  createStyles({
    scroll: {
      overflow: 'auto',
      height: '100px',
    },
    linkCursor: {
      cursor: 'pointer',
    },
  });
