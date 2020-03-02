import withStyles from '@material-ui/core/styles/withStyles';
import { RequestStatus } from './request-status';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';

export default withStyles(styles)(withTranslation('common')(RequestStatus));
