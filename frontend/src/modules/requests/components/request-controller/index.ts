import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { RequestController } from './request-controller';

export default withStyles(styles)(withTranslation('common')(RequestController));
