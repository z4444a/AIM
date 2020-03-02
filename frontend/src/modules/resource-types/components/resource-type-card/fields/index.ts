import { withTranslation } from 'react-i18next';
import { TypeFields } from './fields';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export default withTranslation('common')(withStyles(styles)(TypeFields));
