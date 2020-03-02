import { ParameterList } from './parameter-list';
import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export default withTranslation('common')(withStyles(styles)(ParameterList));
