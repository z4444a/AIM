import { withTranslation } from 'react-i18next';
import { AimDataGrid } from './aim-data-grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export default withTranslation('common')(withStyles(styles)(AimDataGrid));
