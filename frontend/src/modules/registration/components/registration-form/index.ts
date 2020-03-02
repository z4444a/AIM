import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RegistrationForm } from './registration-form';
import { withTranslation } from 'react-i18next';

export default withStyles(styles)(withTranslation('common')(RegistrationForm));
