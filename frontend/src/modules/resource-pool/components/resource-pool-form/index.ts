import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { ResourcePoolForm } from './resource-pool-form';

export default withStyles(styles)(withTranslation('common')(ResourcePoolForm));
