import { DateConstraint } from './date-constraint';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';

export default withTranslation('common')(withStyles(styles)(DateConstraint));
