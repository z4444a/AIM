import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    inputField: {
      paddingBottom: '30px',
    },
    buttonContainer: {
      paddingTop: '14px',
      paddingBottom: '28px',
      display: 'flex',
      justifyContent: 'center',
    },
    internalButton: {
      padding: 0,
    },
    readonlyField: {
      paddingBottom: '18px',
    },
  });

export type Style = WithStyles<
  'inputField' | 'buttonContainer' | 'internalButton' | 'readonlyField'
>;
