import React from 'react';
import TextField from '@material-ui/core/TextField';
import { WithTranslation } from 'react-i18next';
import {
  ErrorConfig,
  NumberFieldConfigModel,
  NumberFieldHandlers,
  NumberFieldValue,
} from '../models/field-config.model';
import _ from 'underscore';
import Tooltip from '@material-ui/core/Tooltip';
import AimMultipleInput from '../../aim-multiple-input/index';
import parameterConstraintsService from '../../../services/parameter-constraints.service';

export interface Props {
  fieldConfig: NumberFieldConfigModel;
  handlers: NumberFieldHandlers;
  value?: NumberFieldValue;
  values?: NumberFieldValue[];
  needTooltip?: boolean;
  toolTipTitle?: string;
  positive?: boolean;
}

export type InternalProps = Props & WithTranslation;

export interface State {
  dashPresent: boolean;
  inputValue?: string;
  localConfig: NumberFieldConfigModel;
}

export class NumberField extends React.Component<InternalProps, State> {
  private readonly emptyValue = '';
  private readonly dash = '-';
  public constructor(props: InternalProps) {
    super(props);

    this.state = {
      dashPresent: false,
      inputValue: this.emptyValue,
      localConfig: props.fieldConfig,
    };
  }

  public shouldComponentUpdate(
    nextProps: Readonly<InternalProps>,
    nextState: Readonly<State>
  ): boolean {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
  }

  componentDidUpdate(prevProps: Readonly<InternalProps>, prevState: Readonly<State>): void {
    this.setLocalConfig(prevState.localConfig.error);
  }

  public render(): React.ReactNode {
    const { fieldConfig, value, values } = this.props;
    const { inputValue, localConfig } = this.state;
    const {
      className,
      style,
      labelConfig,
      error,
      fullWidth,
      FormHelperTextProps,
      disabled,
      InputProps,
      multipleMax,
    } = fieldConfig;
    const multiple = multipleMax && multipleMax > 1;
    const errorText = this.getErrorText();
    return multiple ? (
      <Tooltip title={this.getToolTip()}>
        <div>
          <AimMultipleInput
            inputValue={this.getValueOrDash(inputValue)}
            onInputChange={this.handleInputChange}
            values={
              values
                ? values
                    .filter(numberValue => !!numberValue || numberValue === 0)
                    .map(numberValue =>
                      numberValue || numberValue === 0 ? numberValue.toString() : this.emptyValue
                    )
                : []
            }
            onValuesChange={this.handleValuesChange}
            fieldConfig={localConfig}
          />
        </div>
      </Tooltip>
    ) : (
      <Tooltip title={this.getToolTip()}>
        <TextField
          required={fieldConfig.required}
          disabled={disabled}
          fullWidth={fullWidth}
          label={labelConfig && labelConfig.visible ? labelConfig.value : undefined}
          helperText={localConfig.error ? localConfig.error.value : undefined}
          className={className}
          style={style}
          onChange={this.handleValueChange}
          error={!!errorText || !!error}
          value={this.getValueOrDash(value)}
          InputProps={{
            ...InputProps,
            fullWidth: true,
          }}
          FormHelperTextProps={FormHelperTextProps}
          variant="standard"
        />
      </Tooltip>
    );
  }
  private getValueOrDash = (value?: string | null | number) => {
    return value !== undefined && value !== null
      ? value.toString()
      : this.state.dashPresent
      ? this.dash
      : this.emptyValue;
  };
  private setDashPresent = (eventValue: string) => {
    const { positive } = this.props;
    this.setState({
      dashPresent: !positive && !!eventValue && eventValue === this.dash,
    });
  };

  private handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    const parsedValue = parseInt(event.target.value, 10);

    const { fieldConfig, handlers } = this.props;
    const { onValueChange } = handlers;
    const dashPos = eventValue.indexOf(this.dash);
    if (isNaN(parsedValue) || dashPos > 0) {
      if (eventValue === '' || eventValue === this.dash) {
        this.setDashPresent(eventValue);
        onValueChange(undefined, fieldConfig.key);
      }
      return;
    }

    onValueChange(parsedValue, fieldConfig.key);
  };

  private handleInputChange = (input: string) => {
    const parsedValue = parseInt(input, 10);
    const dashPos = input.indexOf(this.dash);
    if (isNaN(parsedValue) || dashPos > 0) {
      if (input === '' || input === this.dash) {
        this.setDashPresent(input);
        this.setState({ inputValue: undefined });
      }
      return;
    }
    this.setState({ inputValue: input });
  };

  private setLocalConfig = (prevError?: ErrorConfig) => {
    const { fieldConfig, value } = this.props;
    const multiple = fieldConfig.multipleMax && fieldConfig.multipleMax > 1;
    const { error, ...rest } = fieldConfig;
    const { inputValue } = this.state;
    parameterConstraintsService.setI18n({ ...this.props });
    const localErrorModel = parameterConstraintsService.checkNumberConstraints(
      fieldConfig,
      multiple ? parseInt(inputValue ? inputValue : this.emptyValue) : value
    );
    const localError = localErrorModel ? localErrorModel : undefined;
    const newError = error ? error : localError;
    if ((prevError && !newError) || (newError && !prevError)) {
      this.setState({ localConfig: { ...rest, error: newError } });
    }
  };

  private handleValuesChange = (stringValues: string[]) => {
    const { handlers, fieldConfig } = this.props;
    const { key, multipleMax } = fieldConfig;
    if (!handlers || typeof handlers.onValuesChange !== 'function' || !multipleMax) {
      return;
    }
    const numberValues = stringValues
      .map(value => parseInt(value, 10))
      .filter(value => !isNaN(value));
    this.setState({
      dashPresent: false,
    });
    handlers.onValuesChange(numberValues, key);
  };

  private getErrorText = () => {
    const { value, fieldConfig, t } = this.props;
    const { error, constraints, multipleMax } = fieldConfig;
    const { inputValue } = this.state;

    if (error) {
      return error.value;
    }
    if (!constraints) {
      return undefined;
    }
    const maxErrorText = t('numberField.maxErrorText') + constraints.maxNumberValue;
    const minErrorText = t('numberField.minErrorText') + constraints.minNumberValue;
    const parsedValue = parseInt(inputValue ? inputValue : this.emptyValue, 10);
    if (multipleMax && multipleMax > 1 && !isNaN(parsedValue)) {
      if (
        (!!constraints.maxNumberValue || constraints.maxNumberValue === 0) &&
        (!!parsedValue || parsedValue === 0) &&
        parsedValue > constraints.maxNumberValue
      ) {
        return maxErrorText;
      }
      if (
        (!!constraints.minNumberValue || constraints.minNumberValue === 0) &&
        (!!parsedValue || parsedValue === 0) &&
        parsedValue < constraints.minNumberValue
      ) {
        return minErrorText;
      }
    }

    if (!value && value !== 0) {
      return undefined;
    }

    if (constraints.maxNumberValue && value > constraints.maxNumberValue) {
      return maxErrorText;
    }

    if (constraints.minNumberValue && value < constraints.minNumberValue) {
      return minErrorText;
    }
  };

  private getToolTip = (): string => {
    const { toolTipTitle, needTooltip, fieldConfig } = this.props;
    if (toolTipTitle) {
      return toolTipTitle;
    }
    if (!needTooltip) {
      return '';
    }
    return fieldConfig.constraints
      ? this.getConstraintTooltip(
          fieldConfig.constraints.minNumberValue,
          fieldConfig.constraints.maxNumberValue
        )
      : this.getConstraintTooltip();
  };

  private getConstraintTooltip = (
    min: number | undefined = undefined,
    max: number | undefined = undefined
  ): string => {
    return (
      'Введите число' +
      (!min && !max
        ? ''
        : min && max
        ? ' из диапазона ' + min + ' - ' + max
        : min
        ? ' не меньшее ' + min
        : ' не большее ' + max)
    );
  };
}
