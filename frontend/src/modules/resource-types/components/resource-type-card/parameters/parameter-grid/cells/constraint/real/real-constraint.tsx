import React from 'react';
import { Style } from './styles';
import { FieldType } from '../../../../../../../../../commons/components/generic-fields/models/field-config.model';
import RealNumberField from '../../../../../../../../../commons/components/generic-fields/real-number-field/index';
import RangeField from '../../../../../../../../../commons/components/range-field/index';

export interface Props {
  minValue: number | undefined;
  onMinValueChange: (value?: number) => void;
  maxValue: number | undefined;
  onMaxValueChange: (value?: number) => void;
  style?: React.CSSProperties;
  className?: string;
  editable?: boolean;
}

export type InternalProps = Props & Style;

export class RealConstraint extends React.PureComponent<InternalProps> {
  public render(): React.ReactNode {
    const { style, className, minValue, maxValue, editable } = this.props;
    return (
      <RangeField fieldWidth={'100%'} style={style} className={className}>
        <RealNumberField
          value={minValue}
          fieldConfig={{
            fieldType: FieldType.Number,
            disabled: !editable,
            key: 'min',
            required: false,
            constraints: {
              precision: 2,
            },
          }}
          handlers={{
            onValueChange: this.handleValueChange,
          }}
        />
        <RealNumberField
          value={maxValue}
          fieldConfig={{
            fieldType: FieldType.Number,
            disabled: !editable,
            key: 'max',
            required: false,
            constraints: {
              minNumberValue: minValue !== undefined ? minValue + 1 : undefined,
              precision: 2,
            },
          }}
          handlers={{
            onValueChange: this.handleValueChange,
          }}
        />
      </RangeField>
    );
  }

  private handleValueChange = (value: number | undefined, key: string) => {
    const { onMinValueChange, onMaxValueChange } = this.props;
    if (key === 'min') {
      onMinValueChange(value);
      return;
    }
    if (key === 'max') {
      onMaxValueChange(value);
    }
  };
}
