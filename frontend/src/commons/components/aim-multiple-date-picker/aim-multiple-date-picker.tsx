import React from 'react';
import AimDatePicker from '../date-picker/aim-date-picker';
import { Chip } from '@material-ui/core';
import { Style } from './styles';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import moment from 'moment';
import { DateFormat } from '../../values/date-format';
import { DatePickerModalProps } from 'material-ui-pickers/DatePicker/DatePickerModal';

interface Props extends DatePickerModalProps {
  values: Date[];
  valueLimit?: number;
  onValuesChange: (values: Date[]) => void;
}
interface State {
  shrink: boolean;
}
type InternalProps = Props & Style;
export class AimMultipleDatePicker extends React.Component<InternalProps, State> {
  constructor(props: InternalProps) {
    super(props);
    this.state = {
      shrink: props.values.length !== 0,
    };
  }

  componentDidUpdate(prevProps: Readonly<InternalProps>, prevState: Readonly<State>): void {
    if (prevProps.values.length !== this.props.values.length) {
      this.setState({
        shrink: this.props.values.length !== 0,
      });
    }
  }

  render(): React.ReactNode {
    const { value, onChange, values, onValuesChange, valueLimit, classes, ...rest } = this.props;
    const { shrink } = this.state;
    const disabled = this.props.disabled || (!!valueLimit && values.length >= valueLimit);
    const disabledProps = disabled
      ? {
          onClick: () => {},
        }
      : {};
    return (
      <AimDatePicker
        placeholder={''}
        value={undefined}
        onChange={this.handleChange}
        shouldDisableDate={(day: MaterialUiPickersDate) => this.shouldDisableDate(day.toDate())}
        {...disabledProps}
        {...rest}
        InputProps={{
          startAdornment: values.map((item, index) => (
            <Chip
              key={index}
              tabIndex={-1}
              label={moment(item).format(DateFormat.ISO_DATE)}
              className={classes.chip}
              onDelete={this.handleDelete(index)}
            />
          )),
          disabled: disabled,
        }}
        InputLabelProps={{
          shrink: shrink,
        }}
      />
    );
  }
  private shouldDisableDate = (date: Date): boolean => {
    const { values } = this.props;
    return values.map(date => new Date(date).getDate()).indexOf(date.getDate()) !== -1;
  };

  private handleChange = (day: MaterialUiPickersDate) => {
    const { onValuesChange, values, valueLimit, onChange } = this.props;
    const date = day.toDate();
    if ((!!valueLimit && values.length === valueLimit) || date === null) {
      return;
    }
    onValuesChange([...values, date]);
    onChange(day);
  };

  private handleDelete = (key: number) => () => {
    const { values, onValuesChange } = this.props;
    const rest = values.filter((value, index) => index !== key);
    onValuesChange(rest);
  };
}
