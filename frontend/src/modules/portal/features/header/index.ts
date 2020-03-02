import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import actions from '../../../../redux/actions';
import { Header } from './header';
import { RootState } from 'typesafe-actions';

export const mapStateToProps = (state: RootState) => ({
  name: state.tokens && state.tokens.user ? state.tokens.user.fullName : '',
});

export const mapDispatchToProps = (dispatch: Function) => ({
  logout: () => dispatch(actions.logout.logout()),
  toggleSideNav: () => dispatch(actions.portal.togglePortalSideNavPanel()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
