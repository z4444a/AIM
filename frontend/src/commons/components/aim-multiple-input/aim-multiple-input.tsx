import React from 'react';
import TextField from '@material-ui/core/TextField';
import { BaseFieldConfigModel } from '../generic-fields/models/field-config.model';
import Chip from '@material-ui/core/Chip';
import { Style } from './styles';
interface Props {
  inputValue: string;
  onInputChange: (inputValue: string) => void;
  values: string[];
  onValuesChange: (values: string[]) => void;
  fieldConfig: BaseFieldConfigModel;
}
type InternalProps = Props & Style;
interface State {
  shrink: boolean;
}
export class AimMultipleInput extends React.PureComponent<InternalProps, State> {
  constructor(props: InternalProps) {
    super(props);
    this.state = {
      shrink: props.values.length !== 0,
    };
  }

  componentDidUpdate(prevProps: Readonly<InternalProps>, prevState: Readonly<State>): void {
    if (!this.state.shrink) {
      this.setState({
        shrink: this.props.values.length !== 0,
      });
    }
  }

  public render(): React.ReactNode {
    const { inputValue, values, fieldConfig, classes } = this.props;
    const { className, style, required, labelConfig, error } = fieldConfig;
    return (
      <TextField
        disabled={values.length === fieldConfig.multipleMax}
        style={style}
        className={className}
        error={!!error}
        helperText={error ? error.value : undefined}
        label={labelConfig && labelConfig.visible ? labelConfig.value : undefined}
        required={required}
        value={inputValue}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        onFocus={() => this.setState({ shrink: true })}
        onBlur={this.handleBlur}
        InputProps={{
          startAdornment: values.map((value, index) => (
            <Chip
              key={index}
              tabIndex={-1}
              label={value}
              className={classes.chip}
              onDelete={this.handleDelete(index)}
            />
          )),
        }}
        InputLabelProps={{
          shrink: this.state.shrink,
        }}
      />
    );
  }

  private handleKeyDown = (event: React.KeyboardEvent) => {
    const { values, onValuesChange, fieldConfig, inputValue, onInputChange } = this.props;
    if (values.length !== 0 && !inputValue.length && event.key === 'Backspace') {
      const rest = values.slice(0, values.length - 1);
      onValuesChange(rest);
    }
    if (
      fieldConfig &&
      fieldConfig.multipleMax &&
      fieldConfig.multipleMax > values.length &&
      inputValue.length !== 0 &&
      event.key === 'Enter' &&
      !fieldConfig.error
    ) {
      const newValues = [...values, inputValue];
      onInputChange('');
      onValuesChange(newValues);
    }
  };

  private handleInputChange = (event: React.ChangeEvent<{ value: string }>) => {
    const { onInputChange } = this.props;
    this.setState({
      shrink: true,
    });
    onInputChange(event.target.value);
  };

  private handleDelete = (key: number) => () => {
    const { values, onValuesChange } = this.props;
    const rest = values.filter((value, index) => index !== key);
    onValuesChange(rest);
  };

  private handleBlur = () => {
    const { values, onInputChange, onValuesChange, inputValue, fieldConfig } = this.props;
    this.setState({ shrink: values.length !== 0 });
    if (
      fieldConfig &&
      fieldConfig.multipleMax &&
      fieldConfig.multipleMax > values.length &&
      inputValue.length !== 0 &&
      !fieldConfig.error
    ) {
      const newValues = [...values, inputValue];
      onInputChange('');
      onValuesChange(newValues);
    }
  };
}
