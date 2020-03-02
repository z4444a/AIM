import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ResourcePoolFilterPanel } from './resource-pool-filter-panel';
import { withTranslation } from 'react-i18next';

export default withStyles(styles)(withTranslation('common')(ResourcePoolFilterPanel));
