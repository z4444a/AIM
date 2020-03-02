import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { PoolConstraint } from './pool-constraint';

export default withTranslation('common')(withStyles(styles)(PoolConstraint));
