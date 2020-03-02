import { connect } from 'react-redux';
import { GenericFormValue } from '../../../../commons/components/generic-fields/models/field-config.model';
import { AcceptDialogValuesHandler } from './accept-dialog-values-handler';
import { RootState } from 'typesafe-actions';
import {
  resetDialogValues,
  resetSelectedPool,
  selectPool,
  updateDialogValues,
} from '../../../../redux/actions/request-accept-page-action';
import NamedModel from '../../../../model/base/named-model';

export const mapDispatchToProps = (dispatch: Function) => ({
  updateValues: (values: GenericFormValue) => dispatch(updateDialogValues(values)),
  resetValues: () => dispatch(resetDialogValues()),
  onPoolSelected: (pool: NamedModel) => dispatch(selectPool(pool)),
  resetSelectedPool: () => dispatch(resetSelectedPool()),
});

export const mapStateToProps = (state: RootState) => ({
  values: state.requestAcceptPage.allocationParameterValues,
  selectedPool: state.requestAcceptPage.selectedPool,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptDialogValuesHandler);
