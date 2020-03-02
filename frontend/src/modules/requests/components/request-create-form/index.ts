import { RequestCreateForm } from './request-create-form';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';

export default withStyles(styles)(withTranslation('common')(RequestCreateForm));
