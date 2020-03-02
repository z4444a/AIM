import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';
import { EmailSettingsCard } from './email-settings-card';

export default withStyles(styles)(withTranslation('common')(EmailSettingsCard));
