import { LoadingAction } from '../../../../redux/actions/loading-actions';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { GuestPage } from './guest-page';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';

export const mapStateToProps = (state: RootState) => ({
  firstUserExists: state.reg.firstUserExists,
  checkingExistenceOfFirstUser: state.reg.checkingExistenceOfFirstUser,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  checkIsFirstUserExist: () => dispatch(LoadingAction.request()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation('common')(GuestPage)));
