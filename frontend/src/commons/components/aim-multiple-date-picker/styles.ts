import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'chip'>;
export const styles = (theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing.unit,
    },
  });
