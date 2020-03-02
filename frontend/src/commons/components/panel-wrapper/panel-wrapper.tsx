import React, { ReactNode } from 'react';
import { Style } from './styles';

export interface Props {}

export type InternalProps = Props & Style;

export class PanelWrapper extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { children, classes } = this.props;
    return <div className={classes.container}>{children}</div>;
  }
}
