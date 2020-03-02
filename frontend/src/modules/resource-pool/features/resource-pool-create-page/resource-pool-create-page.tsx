import React from 'react';
import ResourcePoolPage from '../resource-pool-page/index';
import { mapDispatchToProps, mapStateToProps } from './index';
import { PoolFormModel } from '../../../../model/form/pool-form-model';
import { ParameterValueFormModel } from '../../../../model/form/parameter-value-form-model';
import { ParameterValueCreateModel } from '../../../../model/create/parameter-value-create-model';

export type InternalProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

export class ResourcePoolCreatePage extends React.PureComponent<InternalProps> {
  public render(): React.ReactNode {
    const { user } = this.props;
    const currentUser = user !== null ? user : undefined;
    return <ResourcePoolPage onFormSubmit={this.onFormSubmit} user={currentUser} />;
  }

  private onFormSubmit = (form: PoolFormModel) => {
    const { createResourcePool } = this.props;
    const { parametersValues } = form;
    const createModel = {
      ...form,
      parametersValues: parametersValues
        ? parametersValues.map(this.toParameterValueCreateModel)
        : [],
    };
    createResourcePool(createModel);
  };

  private toParameterValueCreateModel = (
    valueFormModel: ParameterValueFormModel
  ): ParameterValueCreateModel => {
    const { parameterPool, ...valueBaseModel } = valueFormModel;
    return {
      ...valueBaseModel,
      parameterPoolId: parameterPool ? parameterPool.id : undefined,
    };
  };
}
