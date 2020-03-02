import React from 'react';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import { FieldType } from '../../../../../../../../../commons/components/generic-fields/models/field-config.model';
import NumberField from '../../../../../../../../../commons/components/generic-fields/number-field/index';
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

export type InternalProps = Props & WithTranslation & Style;

export class NumberConstraint extends React.PureComponent<InternalProps> {
  public render(): React.ReactNode {
    const { style, className, minValue, maxValue, editable } = this.props;
    return (
      <RangeField fieldWidth={'100%'} style={style} className={className}>
        <NumberField
          value={minValue}
          fieldConfig={{
            disabled: !editable,
            fieldType: FieldType.Number,
            key: 'min',
            required: false,
          }}
          handlers={{
            onValueChange: this.handleValueChange,
          }}
        />
        <NumberField
          value={maxValue}
          fieldConfig={{
            fieldType: FieldType.Number,
            disabled: !editable,
            key: 'max',
            required: false,
            constraints: {
              minNumberValue: minValue !== undefined ? minValue + 1 : undefined,
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
