import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    field: {
      display: 'inline-block',
      margin: `0 ${theme.spacing.unit}px`,
      '& input': { textAlign: 'center' },
    },
  });

export type Style = WithStyles<'field'>;
