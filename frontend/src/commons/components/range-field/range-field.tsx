import React from 'react';
import { Style } from './styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { InternalProps as GenericFieldProps } from '../generic-fields/generic-field/generic-field';
import { FormHelperText } from '@material-ui/core';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import _ from 'underscore';

export interface Props {
  children: React.ReactElement<GenericFieldProps>[];
  fieldWidth?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface State {
  helperTextRefFrom: React.Component<FormHelperTextProps> | null;
  helperTextFrom: React.ReactNode | undefined;
  helperTextRefTo: React.Component<FormHelperTextProps> | null;
  helperTextTo: React.ReactNode | undefined;
}

export type InnerProps = Props & Style;

export class RangeField extends React.PureComponent<InnerProps, State> {
  public constructor(props: InnerProps) {
    super(props);
    this.state = {
      helperTextRefFrom: null,
      helperTextFrom: undefined,
      helperTextRefTo: null,
      helperTextTo: undefined,
    };
  }

  public componentDidUpdate(prevProps: Readonly<InnerProps>, prevState: Readonly<State>): void {
    const { helperTextRefFrom, helperTextRefTo, helperTextTo, helperTextFrom } = this.state;
    let newHelperTextFrom = helperTextFrom;
    let newHelperTextTo = helperTextTo;

    if (
      helperTextRefFrom &&
      !_.isEqual(prevState.helperTextFrom, helperTextRefFrom.props.children)
    ) {
      newHelperTextFrom = helperTextRefFrom.props.children;
    }

    if (helperTextRefTo && !_.isEqual(prevState.helperTextFrom, helperTextRefTo.props.children)) {
      newHelperTextTo = helperTextRefTo.props.children;
    }

    this.setState({
      helperTextFrom: newHelperTextFrom,
      helperTextTo: newHelperTextTo,
    });
  }

  public render(): React.ReactNode {
    const { classes, className, style, fieldWidth, height } = this.props;
    const { helperTextRefTo, helperTextRefFrom, helperTextFrom, helperTextTo } = this.state;

    const fields = React.Children.map(
      this.props.children,
      (item: React.ReactElement<GenericFieldProps>, index) => {
        if (index > 1) {
          return null;
        }
        const { fieldConfig } = item.props;
        const { className, style, ...rest } = fieldConfig;
        const newClassName = classNames(item.props.fieldConfig.className, classes.field);
        const additionalProps = {
          key: index,
          fieldConfig: {
            ...rest,
            style: {
              ...style,
              width: fieldWidth,
            },
            className: newClassName,
            FormHelperTextProps: {
              style: { display: 'none' },
              ref: index > 0 ? this.setHelperTextRefTo : this.setHelperTextRefFrom,
            },
          },
        };
        return React.cloneElement(item, additionalProps);
      }
    );

    return (
      <div
        style={{
          height: height ? height : '50px',
        }}
      >
        <div
          className={className}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            ...style,
          }}
        >
          <Typography>[</Typography>
          {fields[0]}
          <Typography>—</Typography>
          {fields[1]}
          <Typography>]</Typography>
        </div>
        {helperTextRefFrom && <FormHelperText error>{helperTextFrom}</FormHelperText>}
        {helperTextRefTo && <FormHelperText error>{helperTextTo}</FormHelperText>}
      </div>
    );
  }

  private setHelperTextRefFrom = (ref: React.Component<FormHelperTextProps>) => {
    this.setState({
      helperTextRefFrom: ref,
      helperTextFrom: ref && ref.props.children,
    });
  };

  private setHelperTextRefTo = (ref: React.Component<FormHelperTextProps>) => {
    this.setState({
      helperTextRefTo: ref,
      helperTextTo: ref && ref.props.children,
    });
  };
}
