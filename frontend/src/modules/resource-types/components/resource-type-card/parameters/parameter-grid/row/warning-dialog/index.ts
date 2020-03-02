import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { WarningDialog } from './warning-dialog';

export default withStyles(styles)(withTranslation('common')(WarningDialog));
