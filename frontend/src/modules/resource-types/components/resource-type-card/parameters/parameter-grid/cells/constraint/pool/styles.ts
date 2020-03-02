import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    inputField: {
      paddingBottom: '30px',
    },
  });

export type Style = WithStyles<'inputField'>;
