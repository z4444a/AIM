import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { LoginForm } from './login-form';
import { withTranslation } from 'react-i18next';

export default withStyles(styles)(withTranslation('common')(LoginForm));
