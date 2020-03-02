import TextField from '@material-ui/core/TextField';
import { WithTranslation } from 'react-i18next';
import React from 'react';
import {
  ErrorConfig,
  NumberFieldHandlers,
  NumberFieldValue,
  RealNumberFieldConfigModel,
} from '../models/field-config.model';
import _ from 'underscore';
import Tooltip from '@material-ui/core/Tooltip';
import AimMultipleInput from '../../aim-multiple-input/index';
import parameterConstraintsService from '../../../services/parameter-constraints.service';

export interface Props {
  fieldConfig: RealNumberFieldConfigModel;
  handlers: NumberFieldHandlers;
  value?: NumberFieldValue;
  values?: NumberFieldValue[];
  needTooltip?: boolean;
}

export type InternalProps = Props & WithTranslation;

export interface State {
  dashPresent: boolean;
  dotPresent: boolean;
  fixedDecimals: number;
  inputValue?: NumberFieldValue;
  localConfig: RealNumberFieldConfigModel;
}

export class RealNumberField extends React.Component<InternalProps, State> {
  private readonly dash = '-';
  public constructor(props: InternalProps) {
    super(props);

    this.state = {
      dashPresent: false,
      dotPresent: false,
      fixedDecimals: 0,
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
    const { fieldConfig, value, needTooltip, values } = this.props;
    const {
      className,
      style,
      labelConfig,
      required,
      FormHelperTextProps,
      error,
      disabled,
      multipleMax,
    } = fieldConfig;
    const { inputValue, localConfig } = this.state;
    const multiple = multipleMax && multipleMax > 1;
    const errorText = this.getErrorText(value);
    const tooltipTitle = needTooltip
      ? fieldConfig.constraints
        ? this.getTooltip(
            fieldConfig.constraints.minNumberValue,
            fieldConfig.constraints.maxNumberValue
          )
        : this.getTooltip()
      : '';
    return multiple ? (
      <Tooltip title={tooltipTitle}>
        <div>
          <AimMultipleInput
            inputValue={this.getShownValue(inputValue)}
            onInputChange={this.handleInputChange}
            values={
              values
                ? values
                    .filter(item => item || item === 0)
                    .map(item => (item || item === 0 ? item.toString() : ''))
                : []
            }
            onValuesChange={this.handleValuesChange}
            fieldConfig={localConfig}
          />
        </div>
      </Tooltip>
    ) : (
      <Tooltip title={tooltipTitle}>
        <TextField
          required={required}
          disabled={disabled}
          label={labelConfig && labelConfig.value}
          className={className}
          style={style}
          onChange={this.handleChange}
          error={!!errorText || !!error}
          value={this.getShownValue(value)}
          variant="standard"
          helperText={errorText}
          InputProps={{
            fullWidth: true,
          }}
          FormHelperTextProps={FormHelperTextProps}
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
    const localErrorModel = parameterConstraintsService.checkRealNumberConstraints(
      fieldConfig,
      multiple ? inputValue : value
    );
    const localError = localErrorModel ? localErrorModel : undefined;
    const newError = error ? error : localError;
    if ((prevError && !newError) || (newError && !prevError)) {
      this.setState({ localConfig: { ...rest, error: newError } });
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;

    const { fieldConfig, handlers, value } = this.props;

    this.setDashPresent(eventValue);
    this.setDotPresent(eventValue);
    this.setFixedDecimals(eventValue);

    if (isNaN(parseFloat(eventValue))) {
      if (!value || !eventValue || eventValue === '-') {
        handlers.onValueChange(undefined, fieldConfig.key);
      }
      return;
    }

    const newValue = this.getValue(eventValue);
    handlers.onValueChange(newValue, fieldConfig.key);
  };

  private setDashPresent = (eventValue: string) => {
    this.setState({
      dashPresent: !!eventValue && eventValue[0] === '-',
    });
  };

  private setDotPresent = (eventValue: string) => {
    this.setState({
      dotPresent: !!eventValue && eventValue.includes('.'),
    });
  };

  private setFixedDecimals = (eventValue: string) => {
    let value = 0;

    const { fieldConfig } = this.props;
    const { constraints } = fieldConfig;

    if (eventValue.includes('.')) {
      const length = eventValue.split('.')[1].length;
      value =
        constraints && constraints.precision !== undefined && length > constraints.precision
          ? constraints.precision
          : length;
    }

    this.setState({
      fixedDecimals: value,
    });
  };

  private getValue = (eventValue: string): number => {
    const parsedValue = parseFloat(eventValue);
    const { fieldConfig } = this.props;
    const { constraints } = fieldConfig;

    if (constraints) {
      const { precision } = constraints;

      if (precision !== undefined) {
        const position = eventValue.indexOf('.');
        const rest = eventValue.substr(position).length - precision - 1;
        if (position > 0 && rest > 0) {
          return parseFloat(eventValue.substr(0, eventValue.length - rest));
        }
      }
    }
    return parsedValue;
  };

  private getErrorText = (value?: NumberFieldValue) => {
    const { fieldConfig, t } = this.props;
    const { error, constraints } = fieldConfig;

    if (error) {
      return error.value;
    }

    if ((!value && value !== 0) || !constraints) {
      return undefined;
    }

    if (
      (constraints.maxNumberValue || constraints.maxNumberValue === 0) &&
      value > constraints.maxNumberValue
    ) {
      return t('numberField.maxErrorText') + constraints.maxNumberValue;
    }

    if (
      (constraints.minNumberValue || constraints.minNumberValue === 0) &&
      value < constraints.minNumberValue
    ) {
      return t('numberField.minErrorText') + constraints.minNumberValue;
    }
  };

  private handleValuesChange = (stringValues: string[]) => {
    const { handlers, fieldConfig } = this.props;
    const { key, multipleMax } = fieldConfig;
    if (!handlers || typeof handlers.onValuesChange !== 'function' || !multipleMax) {
      return;
    }
    const numberValues = stringValues
      .map(value => parseFloat(value))
      .filter(value => !isNaN(value));
    this.setState({
      dashPresent: false,
      dotPresent: false,
      fixedDecimals: 0,
    });
    handlers.onValuesChange(numberValues, key);
  };

  private getShownValue = (value: NumberFieldValue) => {
    const { dashPresent, dotPresent, fixedDecimals } = this.state;
    let prefix = '';
    if (value === undefined || value === null) {
      return dashPresent ? '-' : '';
    }
    if (dashPresent && value >= 0) {
      prefix = '-';
    }
    if (dotPresent && !fixedDecimals) {
      return prefix + value + '.';
    }
    if (fixedDecimals) {
      return prefix + value.toFixed(fixedDecimals);
    }
    return prefix + value.toString();
  };

  private handleInputChange = (input: string) => {
    const { inputValue } = this.state;
    this.setDashPresent(input);
    this.setDotPresent(input);
    this.setFixedDecimals(input);
    if (isNaN(parseFloat(input))) {
      if (!inputValue || !input || input === this.dash) {
        this.setState({ inputValue: undefined });
      }
      return;
    }

    const newValue = this.getValue(input);
    this.setState({ inputValue: newValue });
  };

  private getTooltip = (
    min: number | undefined = undefined,
    max: number | undefined = undefined
  ): string => {
    return (
      'Введите дробное число' +
      (!min && min !== 0 && !max && max !== 0
        ? ''
        : (min || min === 0) && (max || max === 0)
        ? ' из диапазона ' + min + ' - ' + max
        : min || min === 0
        ? ' не меньшее ' + min
        : ' не большее ' + max)
    );
  };
}
