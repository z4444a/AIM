import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { ResourceTypeFilterPanel } from './resource-type-filter-panel';

export default withStyles(styles)(withTranslation('common')(ResourceTypeFilterPanel));
