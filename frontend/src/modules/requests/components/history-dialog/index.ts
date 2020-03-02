import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';
import { HistoryDialog } from './history-dialog';
import { styles } from './styles';

export default withStyles(styles)(withTranslation('common')(HistoryDialog));
