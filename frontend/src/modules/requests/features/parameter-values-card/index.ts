import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { ParameterValuesCard } from './parameter-values-card';
import { withTranslation } from 'react-i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export const mapStateToProps = (state: RootState) => ({
  values: state.requestAcceptPage.currentParameterValues,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(withTranslation('common')(ParameterValuesCard)));
