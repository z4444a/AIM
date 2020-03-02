import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { MainMenu } from './main-menu';
import { withTranslation } from 'react-i18next';
import { RootState } from 'typesafe-actions';

export const mapStateToProps = (state: RootState) => ({
  user: state.tokens ? state.tokens.user : null,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  redirect: (path: string) => dispatch(push(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(MainMenu));
