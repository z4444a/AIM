import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ListValues } from './list-values';
import { withTranslation } from 'react-i18next';

export default withTranslation('common')(withStyles(styles)(ListValues));
