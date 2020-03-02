import React, { ReactNode } from 'react';
import { Style } from './styles';
import Spinner from '../spinner/spinner';
import { Typography } from '@material-ui/core';

export interface Props {
  active?: boolean;
  text?: string;
}

export type InternalProps = Props & Style;

export class Overlay extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { classes, active, text } = this.props;
    if (active) {
      return (
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <Spinner />
            {text && <Typography>{text}</Typography>}
          </div>
        </div>
      );
    }
    return null;
  }
}
