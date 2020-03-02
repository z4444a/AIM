import React, { ReactNode } from 'react';
import MUITextField from '@material-ui/core/TextField';
import {
  ErrorConfig,
  TextFieldConfigModel,
  TextFieldHandlers,
  TextFieldValue,
} from '../models/field-config.model';
import Tooltip from '@material-ui/core/Tooltip';
import AimMultipleInput from '../../aim-multiple-input/index';
import parameterConstraintsService from '../../../services/parameter-constraints.service';
import { WithTranslation } from 'react-i18next';

export interface Props {
  fieldConfig: TextFieldConfigModel;
  handlers: TextFieldHandlers;
  value?: TextFieldValue;
  values?: TextFieldValue[];
  needTooltip?: boolean;
}

export type InternalProps = Props & WithTranslation;
interface State {
  inputValue: string;
  localConfig: TextFieldConfigModel;
}
export class TextField extends React.PureComponent<InternalProps, State> {
  private readonly emptyValue = '';
  constructor(props: InternalProps) {
    super(props);
    this.state = {
      inputValue: this.emptyValue,
      localConfig: props.fieldConfig,
    };
  }

  componentDidUpdate(prevProps: Readonly<InternalProps>, prevState: Readonly<State>): void {
    this.setLocalConfig(prevState.localConfig.error);
  }

  public render(): ReactNode {
    const { value, fieldConfig, needTooltip, values } = this.props;
    const { error, className, style, required, labelConfig, multipleMax } = fieldConfig;
    const multiple = (multipleMax && multipleMax > 1) as boolean;
    const singleValue = value ? value : this.emptyValue;
    const { localConfig, inputValue } = this.state;
    const tooltipTitle = needTooltip
      ? this.getTooltip(
          fieldConfig.constraints ? fieldConfig.constraints.maxStringLength : undefined
        )
      : '';
    return multiple ? (
      <Tooltip title={tooltipTitle}>
        <div>
          <AimMultipleInput
            fieldConfig={localConfig}
            values={values ? values : []}
            onValuesChange={this.handleValuesChange}
            inputValue={inputValue}
            onInputChange={(input: string) => this.setState({ inputValue: input })}
          />
        </div>
      </Tooltip>
    ) : (
      <Tooltip title={tooltipTitle}>
        <MUITextField
          style={style}
          className={className}
          error={!!error || !!localConfig.error}
          helperText={localConfig.error ? localConfig.error.value : undefined}
          label={labelConfig && labelConfig.visible ? labelConfig.value : undefined}
          required={required}
          value={singleValue}
          onChange={this.handleValueChange}
        />
      </Tooltip>
    );
  }
  private setLocalConfig = (prevError?: ErrorConfig) => {
    const { fieldConfig, value } = this.props;
    const multiple = fieldConfig.multipleMax && fieldConfig.multipleMax > 1;
    const { error, ...rest } = fieldConfig;
    const { inputValue } = this.state;
    parameterConstraintsService.setI18n({ ...this.props });
    const localErrorModel = parameterConstraintsService.checkTextConstraints(
      fieldConfig,
      multiple ? (inputValue as TextFieldValue) : value
    );
    const localError = localErrorModel ? localErrorModel : undefined;
    const newError = error ? error : localError;
    if ((prevError && !newError) || (newError && !prevError)) {
      this.setState({ localConfig: { ...rest, error: newError } });
    }
  };

  private handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { handlers, fieldConfig } = this.props;
    if (!handlers || typeof handlers.onValueChange !== 'function') {
      return;
    }
    handlers.onValueChange(event.target.value, fieldConfig.key);
  };

  private handleValuesChange = (values: string[]) => {
    const { handlers, fieldConfig } = this.props;
    const { key } = fieldConfig;
    if (!handlers || typeof handlers.onValuesChange !== 'function') {
      return;
    }
    handlers.onValuesChange(values, key);
  };

  private getTooltip = (length: number | undefined): string => {
    return 'Введите текст' + (length ? ' не длиннее ' + length + ' символов' : '');
  };
}
