import React from 'react';
import ResourcePoolPage from '../resource-pool-page/index';
import { mapDispatchToProps } from './index';
import { RouteComponentProps } from 'react-router';
import { PoolFormModel } from '../../../../model/form/pool-form-model';
import { ParameterValueFormModel } from '../../../../model/form/parameter-value-form-model';
import { PoolUpdateModel } from '../../../../model/update/pool-update-model';
import { ParameterValueUpdateModel } from '../../../../model/update/parameter-value-update-model';

export type InternalProps = RouteComponentProps<{ id: string }> &
  ReturnType<typeof mapDispatchToProps>;

export class ResourcePoolUpdatePage extends React.PureComponent<InternalProps> {
  public componentDidMount(): void {
    const { match, fetch } = this.props;
    const id = parseInt(match.params.id, 10);
    fetch(id);
  }

  public render(): React.ReactNode {
    return <ResourcePoolPage onFormSubmit={this.onFormSubmit} />;
  }

  private onFormSubmit = (form: PoolFormModel) => {
    const { updateResourcePool, match } = this.props;
    const { parametersValues } = form;
    const updateModel: PoolUpdateModel = {
      id: +match.params.id,
      ...form,
      parametersValues: parametersValues
        ? parametersValues.map(this.toParameterValueUpdateModel)
        : [],
    };
    updateResourcePool(updateModel);
  };
  private toParameterValueUpdateModel = (
    valueFormModel: ParameterValueFormModel
  ): ParameterValueUpdateModel => {
    const { parameterPool, ...valueBaseModel } = valueFormModel;
    return {
      ...valueBaseModel,
      parameterPoolId: parameterPool ? parameterPool.id : undefined,
    };
  };
}
