import { ResourcePoolUpdatePage } from './resource-pool-update-page';
import { connect } from 'react-redux';
import { fetchPool, updatePool } from '../../../../redux/actions/pool-action';
import { PoolUpdateModel } from '../../../../model/update/pool-update-model';
import { DeepPartial } from 'redux';

export const mapDispatchToProps = (dispatch: Function) => ({
  fetch: (id: number) => dispatch(fetchPool.request(id)),
  updateResourcePool: (data: DeepPartial<PoolUpdateModel>) => dispatch(updatePool.request(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(ResourcePoolUpdatePage);
