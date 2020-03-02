import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { RequestAcceptForm } from './request-accept-form';

export default withStyles(styles)(withTranslation('common')(RequestAcceptForm));
