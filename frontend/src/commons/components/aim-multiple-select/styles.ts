import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<
  'root' | 'container' | 'paper' | 'chip' | 'inputRoot' | 'inputInput'
>;
export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: theme.spacing.unit * 7,
    },
    container: {
      flexGrow: 1,
      position: 'relative',
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    chip: {
      marginRight: theme.spacing.unit,
    },
    inputRoot: {
      flexWrap: 'wrap',
    },
    inputInput: {
      width: 'auto',
      flexGrow: 2,
    },
  });
