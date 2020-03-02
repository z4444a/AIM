import { CreateTypePage } from './create-type-page';
import { TypeCreateModel } from '../../../../model/create/type-create-model';
import { createType } from '../../../../redux/actions/type-action';
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch: Function) => ({
  createType: (type: TypeCreateModel) => dispatch(createType.request(type)),
});

export default connect(
  null,
  mapDispatchToProps
)(CreateTypePage);
