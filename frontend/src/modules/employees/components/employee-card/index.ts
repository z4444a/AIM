import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { EmployeeCard } from './employee-card';

export default withStyles(styles)(withTranslation('common')(EmployeeCard));
