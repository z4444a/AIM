import { withTranslation } from 'react-i18next';
import { RejectDialog } from './reject-dialog';
import { styles } from './styles';
import { withStyles } from '@material-ui/core';

export default withStyles(styles)(withTranslation('common')(RejectDialog));
