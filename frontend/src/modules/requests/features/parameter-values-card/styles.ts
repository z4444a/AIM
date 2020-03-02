import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<'panelContainer' | 'header'>;
export const styles = (theme: Theme) =>
  createStyles({
    panelContainer: {
      marginTop: theme.spacing.unit,
    },
    header: {
      fontWeight: 'bold',
    },
  });
