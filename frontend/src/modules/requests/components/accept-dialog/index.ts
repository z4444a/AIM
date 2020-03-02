import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { AcceptDialog } from './accept-dialog';

export default withStyles(styles)(withTranslation('common')(AcceptDialog));
