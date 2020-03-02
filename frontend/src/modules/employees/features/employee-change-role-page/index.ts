import { ChangeRoleParams, EmployeeChangeRolePage } from './employee-change-role-page';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';

import { changeRole, fetchEmployee } from '../../../../redux/actions/full-employee-action';

export const mapDispatchToProps = (dispatch: Function) => ({
  changeRole: (formModel: ChangeRoleParams) => dispatch(changeRole.request(formModel)),
  fetchEmployee: (id: number) => dispatch(fetchEmployee.request(id)),
});

export const mapStateToProps = (state: RootState) => ({
  employee: state.chosenEmployee,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(withTranslation('common')(EmployeeChangeRolePage))));
