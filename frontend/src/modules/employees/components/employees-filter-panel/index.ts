import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { EmployeesFilterPanel } from './employees-filter-panel';

export default withStyles(styles)(withTranslation('common')(EmployeesFilterPanel));
