import { UpdateTypePage } from './update-type-page';
import { connect } from 'react-redux';
import { updateResourceType } from '../../../../redux/actions/resource-type-actions';
import { TypeUpdateModel } from '../../../../model/update/type-update-model';
import { DeepPartial } from 'redux';
import { fetchType } from '../../../../redux/actions/type-action';
import { RootState } from 'typesafe-actions';
import {
  findParameterValue,
  resetRemoveParameterResponse,
} from '../../../../redux/actions/resource-type-page-actions';

export const mapDispatchToProps = (dispatch: Function) => ({
  fetchType: (id: number) => dispatch(fetchType.request(id)),
  updateType: (model: DeepPartial<TypeUpdateModel>) => dispatch(updateResourceType.request(model)),
  findParamValue: (id: number) => dispatch(findParameterValue.request(id)),
  resetRemoveParameterResponse: () => dispatch(resetRemoveParameterResponse()),
});
export const mapStateToProps = (state: RootState) => ({
  oldModel: state.resourceTypePage.previousModelState,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTypePage);
