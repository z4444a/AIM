import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AuthGuard } from './auth-guard';

export const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.tokens && !!state.tokens.refreshToken,
});

export default connect(mapStateToProps)(withRouter(AuthGuard));
