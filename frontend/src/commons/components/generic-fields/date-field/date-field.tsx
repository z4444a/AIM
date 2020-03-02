import React, { ReactNode } from 'react';
import {
  DateFieldConfigModel,
  DateFieldHandlers,
  DateFieldValue,
} from '../models/field-config.model';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import AimDatePicker from '../../date-picker/aim-date-picker';
import AimMultipleDatePicker from '../../aim-multiple-date-picker/index';

export interface Props {
  fieldConfig: DateFieldConfigModel;
  handlers: DateFieldHandlers;
  value?: DateFieldValue;
  values?: DateFieldValue[];
  today?: boolean;
  needTooltip?: boolean;
}

export type InternalProps = Props;

export class DateField extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { fieldConfig, value, today, needTooltip, values } = this.props;
    const {
      className,
      style,
      required,
      labelConfig,
      error,
      FormHelperTextProps,
      disabled,
      multipleMax,
    } = fieldConfig;
    let minDate, maxDate;
    if (fieldConfig.constraints) {
      const { minDateValue, maxDateValue } = fieldConfig.constraints;
      minDate = minDateValue;
      maxDate = maxDateValue;
    }
    const multiple = multipleMax && multipleMax > 1;
    const pickerProps = {
      className: className,
      style: style,
      label: labelConfig && labelConfig.visible ? labelConfig.value : undefined,
      required: required,
      error: !!error,
      helperText: error ? error.value : undefined,
      emptyLabel: today ? '"сегодня"' : '',
      minDate: minDate,
      maxDate: maxDate,
      FormHelperTextProps: FormHelperTextProps,
      disabled: today ? true : disabled,
    };
    return (
      <Tooltip
        title={
          needTooltip
            ? fieldConfig.constraints
              ? this.getTooltip(
                  fieldConfig.constraints.minDateValue,
                  fieldConfig.constraints.maxDateValue
                )
              : this.getTooltip()
            : ''
        }
      >
        {multiple ? (
          <AimMultipleDatePicker
            values={values ? values : []}
            valueLimit={multipleMax}
            onValuesChange={this.handleValuesChange}
            value={undefined}
            onChange={() => {}}
            {...pickerProps}
          />
        ) : (
          <AimDatePicker value={value || null} onChange={this.handleValueChange} {...pickerProps} />
        )}
      </Tooltip>
    );
  }

  private handleValuesChange = (values: Date[]) => {
    const { handlers, fieldConfig } = this.props;
    if (!handlers || typeof handlers.onValuesChange !== 'function') {
      return;
    }
    handlers.onValuesChange(values, fieldConfig.key);
  };

  private handleValueChange = (date: MaterialUiPickersDate) => {
    const { handlers, fieldConfig } = this.props;
    if (!handlers || typeof handlers.onValueChange !== 'function') {
      return;
    }
    handlers.onValueChange(date.toDate(), fieldConfig.key);
  };

  private getTooltip = (
    min: Date | undefined = undefined,
    max: Date | undefined = undefined
  ): string => {
    return (
      'Выберите дату' +
      (!min && !max
        ? ''
        : min && max
        ? ' из диапазона ' +
          moment(min).format('YYYY-MM-DD') +
          ' - ' +
          moment(max).format('YYYY-MM-DD')
        : min
        ? '. Дата должна быть не раньше ' + moment(min).format('YYYY-MM-DD')
        : '. Дата должна быть не позже ' + moment(max).format('YYYY-MM-DD'))
    );
  };
}
