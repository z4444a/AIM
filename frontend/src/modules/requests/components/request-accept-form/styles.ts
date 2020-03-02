import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export type Style = WithStyles<
  | 'container'
  | 'flex'
  | 'spaceBeforeButtons'
  | 'noPadding'
  | 'innerContainer'
  | 'gridContainer'
  | 'fieldName'
  | 'fieldLine'
  | 'sideSpace'
  | 'descriptionPanel'
  | 'hidden'
  | 'boldText'
>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing.unit * 2,
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      minWidth: '100%',
    },
    spaceBeforeButtons: {
      paddingTop: theme.spacing.unit * 3,
    },
    noPadding: {
      padding: 0,
    },
    innerContainer: {
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
    },
    fieldName: {
      fontWeight: 'bold',
      marginRight: theme.spacing.unit,
    },
    boldText: {
      fontWeight: 'bold',
    },
    fieldLine: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 1,
    },
    sideSpace: {
      marginRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
    },
    descriptionPanel: {
      marginTop: theme.spacing.unit,
    },
    hidden: {
      overflow: 'hidden',
    },
  });
