import React from 'react';
import { mapDispatchToProps, mapStateToProps } from './index';
import { RouteComponentProps } from 'react-router';
import ResourceTypePage from '../resource-type-page/index';

export type InternalProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }>;

export class UpdateTypePage extends React.PureComponent<InternalProps> {
  public componentDidMount(): void {
    const { match, fetchType } = this.props;
    const id = parseInt(match.params.id, 10);
    fetchType(id);
  }
  public render(): React.ReactNode {
    const { updateType, oldModel, findParamValue, resetRemoveParameterResponse } = this.props;
    return (
      <ResourceTypePage
        showIdentifiers
        onSubmit={updateType}
        oldModel={oldModel}
        findParamValue={findParamValue}
        resetRemoveParameterResponse={resetRemoveParameterResponse}
      />
    );
  }
}
