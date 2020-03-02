import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<
  'container' | 'newReq' | 'inProgressReq' | 'canceledReq' | 'processedReq' | 'pausedReq'
>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100px',
      '& > *:first-child': {
        marginRight: theme.spacing.unit,
      },
    },
    newReq: {
      color: '#6799d6',
    },
    inProgressReq: {
      color: '#6799d6',
    },
    canceledReq: {
      color: '#b3b3b3',
    },
    processedReq: {
      color: '#00ab33',
    },
    pausedReq: {
      color: '#CCCC00',
    },
  });
