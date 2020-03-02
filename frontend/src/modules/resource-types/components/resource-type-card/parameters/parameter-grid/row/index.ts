import { ParameterRow } from './parameter-row';
import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export default withStyles(styles)(withTranslation('common')(ParameterRow));
