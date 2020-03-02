import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export const styles = (theme: Theme) =>
  createStyles({
    paperContainer: {
      height: '100%',
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      height: '100%',
    },
    gridContainer: {
      width: '100%',
    },
    filterContainer: {
      borderLeft: `1px solid ${theme.palette.grey['300']}`,
    },
    filterPanelOpen: {
      width: '300px',
    },
    filterPanelTransition: {
      transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    filterPanelHidden: {
      width: 0,
    },
  });

export type Style = WithStyles<
  | 'paperContainer'
  | 'innerContainer'
  | 'gridContainer'
  | 'filterContainer'
  | 'filterPanelOpen'
  | 'filterPanelHidden'
  | 'filterPanelTransition'
>;
