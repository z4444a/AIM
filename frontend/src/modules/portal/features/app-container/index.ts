import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { AppContainer } from './app-container';
import { styles } from './styles';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

export const mapStateToProps = (state: RootState) => ({
  overlayActive: state.portal.portalOverlay.active,
  overlayText: state.portal.portalOverlay.text,
});

export default connect(mapStateToProps)(withStyles(styles)(withSnackbar(AppContainer)));
