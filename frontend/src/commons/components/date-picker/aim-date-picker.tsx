import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import { DatePickerModalProps } from 'material-ui-pickers/DatePicker/DatePickerModal';
import { DATE_MASK, DATE_PLACEHOLDER, DateFormat } from '../../values/date-format';
import moment from 'moment';

class AimDatePicker extends React.Component<DatePickerModalProps> {
  public render(): React.ReactNode {
    const { value, emptyLabel, ...rest } = this.props;
    return (
      <DatePicker
        format={DateFormat.ISO_DATE}
        clearable
        placeholder={DATE_PLACEHOLDER}
        invalidDateMessage="Неправильный формат даты"
        minDateMessage="Дата должна быть не раньше минимальной даты"
        maxDateMessage="Дата должна быть не позже максимальной даты"
        mask={value => (value ? DATE_MASK : [])}
        value={value || null}
        emptyLabel={emptyLabel || undefined}
        {...rest}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (date: moment.Moment) => {
    const { onChange } = this.props;
    let utcDate = date;
    if (date) {
      utcDate = moment(date)
        .utc()
        .add(date.utcOffset(), 'm');
    }
    onChange(utcDate);
  };
}

export default AimDatePicker;
