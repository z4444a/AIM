import React from 'react';
import ResourceTypePage from '../resource-type-page/index';
import { mapDispatchToProps } from './index';

export type InternalProps = ReturnType<typeof mapDispatchToProps>;

export class CreateTypePage extends React.PureComponent<InternalProps> {
  public render(): React.ReactNode {
    const { createType } = this.props;
    return <ResourceTypePage onSubmit={createType} />;
  }
}
