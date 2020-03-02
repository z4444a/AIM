import { ResourcePoolCreatePage } from './resource-pool-create-page';
import { connect } from 'react-redux';
import {
  createNewResourcePool,
  selectOwners,
} from '../../../../redux/actions/resource-pool-create-page-actions';
import { PoolCreateModel } from '../../../../model/create/pool-create-model';
import { ItemSelection } from '../../../../commons/components/aim-multiple-select/aim-multiple-select';
import { RootState } from 'typesafe-actions';

export const mapDispatchToProps = (dispatch: Function) => ({
  createResourcePool: (data: PoolCreateModel) => dispatch(createNewResourcePool.request(data)),
  selectOwners: (selection: ItemSelection) => dispatch(selectOwners(selection)),
});
export const mapStateToProps = (state: RootState) => ({
  user: state.tokens ? state.tokens.user : undefined,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcePoolCreatePage);
