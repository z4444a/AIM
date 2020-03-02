import React, { ReactNode } from 'react';
import {
  BaseFieldConfigI,
  DateFieldConfigModel,
  DateFieldValue,
  FieldType,
  GenericFieldHandlers,
  GenericFieldValue,
  ListFieldConfigModel,
  ListFieldValue,
  NumberFieldConfigModel,
  NumberFieldValue,
  RealNumberFieldConfigModel,
  TextFieldConfigModel,
  TextFieldValue,
} from '../models/field-config.model';
import TextField from '../text-field/index';
import NumberField from '../number-field/index';
import DateField from '../date-field/index';
import ListField from '../list-field/index';
import { Style } from './styles';
import RealNumberField from '../real-number-field/index';

export interface Props {
  fieldConfig: BaseFieldConfigI;
  handlers: GenericFieldHandlers;
  value: GenericFieldValue[];
  needTooltip?: boolean;
  toolTipTitle?: string;
}

export type InternalProps = Props & Style;

export class GenericField extends React.PureComponent<InternalProps> {
  private readonly handlers: GenericFieldHandlers;

  public constructor(props: InternalProps) {
    super(props);
    this.handlers = this.getHandlers();
  }

  public componentDidMount(): void {
    const { fieldConfig, handlers } = this.props;
    const list = (fieldConfig as ListFieldConfigModel).optionList;
    const typeId = (fieldConfig as ListFieldConfigModel).typeId;
    if (
      handlers.onFieldRender &&
      typeof handlers.onFieldRender === 'function' &&
      !!typeId &&
      !!list
    ) {
      handlers.onFieldRender(typeId);
    }
  }

  public render(): ReactNode {
    const { fieldConfig, value, classes, needTooltip, toolTipTitle } = this.props;
    const { fieldType } = fieldConfig;

    let field: ReactNode;
    switch (fieldType) {
      case FieldType.Text:
        field = (
          <TextField
            fieldConfig={fieldConfig as TextFieldConfigModel}
            value={value[0] as TextFieldValue}
            values={value as TextFieldValue[]}
            handlers={this.handlers}
            needTooltip={needTooltip}
          />
        );
        break;
      case FieldType.Number:
        field = (
          <NumberField
            fieldConfig={fieldConfig as NumberFieldConfigModel}
            value={value[0] as NumberFieldValue}
            values={value as NumberFieldValue[]}
            handlers={this.handlers}
            needTooltip={needTooltip}
            toolTipTitle={toolTipTitle}
          />
        );
        break;
      case FieldType.Date:
        field = (
          <DateField
            fieldConfig={fieldConfig as DateFieldConfigModel}
            value={value[0] as DateFieldValue}
            values={value as DateFieldValue[]}
            handlers={this.handlers}
            needTooltip={needTooltip}
          />
        );
        break;
      case FieldType.List:
        field = (
          <ListField
            fieldConfig={fieldConfig as ListFieldConfigModel}
            value={value[0] as ListFieldValue}
            values={value as ListFieldValue[]}
            handlers={this.handlers}
          />
        );
        break;
      case FieldType.Real:
        field = (
          <RealNumberField
            fieldConfig={fieldConfig as RealNumberFieldConfigModel}
            value={value[0] as NumberFieldValue}
            values={value as NumberFieldValue[]}
            handlers={this.handlers}
            needTooltip={needTooltip}
          />
        );
        break;
    }
    return <div className={classes.container}>{field}</div>;
  }

  private getHandlers(): GenericFieldHandlers {
    const handlers: GenericFieldHandlers = {
      onValueChange: (value, key) => {
        const { handlers } = this.props;
        if (handlers && typeof handlers.onValueChange === 'function') {
          handlers.onValueChange(value, key);
        }
      },
      onValuesChange: (value, key) => {
        const { handlers } = this.props;
        if (handlers && handlers.onValuesChange && typeof handlers.onValueChange === 'function') {
          handlers.onValuesChange(value, key);
        }
      },
    };

    return handlers;
  }
}
