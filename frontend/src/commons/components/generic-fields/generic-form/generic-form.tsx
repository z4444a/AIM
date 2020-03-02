import React, { ReactNode } from 'react';
import {
  BaseFieldConfigI,
  ErrorConfig,
  GenericFieldHandlers,
  GenericFormHandlers,
  GenericFormValue,
} from '../models/field-config.model';
import GenericField from '../generic-field/index';

export interface Props {
  fieldConfigList: BaseFieldConfigI[];
  handlers: GenericFormHandlers;
  value?: GenericFormValue;
  needTooltip?: boolean;
  errorConfig?: { [key: string]: ErrorConfig };
}

export type InternalProps = Props;

export class GenericForm extends React.PureComponent<InternalProps> {
  private readonly handlers: GenericFieldHandlers;

  public constructor(props: InternalProps) {
    super(props);
    this.handlers = this.getHandlers();
  }

  public render(props = this.props): ReactNode {
    const { fieldConfigList, errorConfig } = props;
    return (
      <div>
        {fieldConfigList &&
          fieldConfigList.length !== 0 &&
          fieldConfigList.map(fieldConfig =>
            this.renderField(fieldConfig, errorConfig ? errorConfig[fieldConfig.key] : undefined)
          )}
      </div>
    );
  }

  private renderField(config: BaseFieldConfigI, errorConfig?: ErrorConfig): ReactNode {
    if (!config || !config.key) {
      return null;
    }
    const value = this.props.value ? this.props.value[config.key] : undefined;
    config.error = errorConfig;
    return (
      <GenericField
        key={config.key}
        fieldConfig={config}
        handlers={this.handlers}
        value={value ? value : []}
        needTooltip={this.props.needTooltip}
      />
    );
  }

  private getHandlers(): GenericFieldHandlers {
    const handlers: GenericFieldHandlers = {
      onValueChange: (fieldValue, fieldKey) => {
        const { handlers, value } = this.props;
        if (!handlers || typeof handlers.onValueChange !== 'function') {
          return;
        }
        const resultValue = Object.assign({}, value);
        if (!resultValue[fieldKey]) {
          resultValue[fieldKey] = [];
        }
        resultValue[fieldKey][0] = fieldValue;
        handlers.onValueChange(resultValue);
      },
      onValuesChange: (values, fieldKey) => {
        const { handlers, value } = this.props;
        if (!handlers || typeof handlers.onValueChange !== 'function') {
          return;
        }
        const resultValue = Object.assign({}, value);
        if (!resultValue[fieldKey]) {
          resultValue[fieldKey] = [];
        }
        resultValue[fieldKey] = values;
        handlers.onValueChange(resultValue);
      },
      onFieldRender: param => {
        const { handlers } = this.props;
        if (!handlers || typeof handlers.onFieldRender !== 'function') {
          return;
        }
        handlers.onFieldRender(param);
      },
    };

    return handlers;
  }
}
