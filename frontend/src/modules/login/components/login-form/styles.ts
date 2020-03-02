import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export type Style = WithStyles<
  'container' | 'paper' | 'avatar' | 'form' | 'submit' | 'card' | 'greeting'
>;

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '500px',
      padding: theme.spacing.unit * 3,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    greeting: {
      marginBottom: theme.spacing.unit * 2,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });
