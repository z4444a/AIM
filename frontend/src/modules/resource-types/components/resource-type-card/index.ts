import { ResourceTypesCard } from './card';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { withTranslation } from 'react-i18next';

export default withTranslation('common')(withStyles(styles)(ResourceTypesCard));
