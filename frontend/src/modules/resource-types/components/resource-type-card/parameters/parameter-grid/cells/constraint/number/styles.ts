import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    field: {
      display: 'inline-block',
      width: '15%',
      margin: `0 ${theme.spacing.unit}`,
      '& input': { textAlign: 'center' },
    },
    bottomField: {
      marginTop: theme.spacing.unit * 2,
    },
  });

export type Style = WithStyles<'field' | 'bottomField'>;
