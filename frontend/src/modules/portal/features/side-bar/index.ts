import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RootState } from 'typesafe-actions';
import { SideBar } from './side-bar';

export const mapStateToProps = (state: RootState) => ({
  sideNavIsOpen: state.portal.sideNavIsOpen,
});

export default connect(mapStateToProps)(withStyles(styles)(SideBar));
