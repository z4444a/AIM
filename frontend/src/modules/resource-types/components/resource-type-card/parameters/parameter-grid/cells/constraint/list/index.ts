import React from 'react';
import { ListConstraint } from './list-constraint';
import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export default React.memo(withStyles(styles)(withTranslation('common')(ListConstraint)));
