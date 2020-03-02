import React from 'react';
import Downshift from 'downshift';
import { WithStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import NamedModel from '../../../model/base/named-model';
import { SuggestionItem } from '../aim-autocomplete/aim-autocomplete';
import { Style } from './styles';

export interface ItemSelection {
  available: NamedModel[];
  selected: NamedModel[];
}
interface FunctionProps {
  selectItems: (selection: ItemSelection) => void;
}
interface InputFieldProps {
  label: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error: boolean;
}
interface RenderSuggestionProps {
  highlightedIndex: number | null;
  index: number;
  itemProps: MenuItemProps;
  selectedItem: NamedModel[];
  suggestion: NamedModel;
}
type RenderInputProps = TextFieldProps &
  WithStyles & {
    ref?: React.Ref<HTMLDivElement>;
  };
interface State {
  inputValue: string;
  shrink: boolean;
  focus: boolean;
}
export type InternalProps = ItemSelection & FunctionProps & InputFieldProps & Style;

class AimMultipleSelect extends React.PureComponent<InternalProps, State> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      inputValue: '',
      shrink: props.selected.length !== 0,
      focus: false,
    };
  }

  private renderInput = (inputProps: RenderInputProps) => {
    const { InputProps, InputLabelProps, classes, ref, ...other } = inputProps;
    return (
      <TextField
        disabled={this.props.disabled}
        required={this.props.required}
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: this.state.shrink,
        }}
        {...other}
      />
    );
  };

  private renderSuggestion = (suggestionProps: RenderSuggestionProps) => {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion) > -1;
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.name}
      </MenuItem>
    );
  };

  private getSuggestions = (value: string, { showEmpty = false } = {}) => {
    const suggestions = this.props.available;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0 && !showEmpty
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;
          if (keep) {
            count += 1;
          }
          return keep;
        });
  };

  private handleKeyDown = (event: React.KeyboardEvent) => {
    const { selected, available, selectItems } = this.props;
    const { inputValue } = this.state;
    if (selected.length && !inputValue.length && event.key === 'Backspace') {
      const item = selected[selected.length - 1];
      const selection: ItemSelection = {
        selected: selected.slice(0, selected.length - 1),
        available: this.contains(available, item) ? available : [...available, item],
      };
      selectItems(selection);
    }
  };

  private handleInputChange = (event: React.ChangeEvent<{ value: string }>) => {
    this.setState({
      inputValue: event.target.value,
      shrink: true,
    });
  };

  private handleChange = (item: NamedModel) => {
    const { selected, available, selectItems } = this.props;

    const selection: ItemSelection = {
      selected: this.contains(selected, item) ? selected : [...selected, item],
      available: available.filter(value => value !== item),
    };
    this.setState({
      inputValue: '',
    });
    selectItems(selection);
  };

  private contains = (list: NamedModel[], item: NamedModel) =>
    list.map(x => x.id).indexOf(item.id) !== -1;

  private handleDelete = (item: NamedModel) => () => {
    const { selected, available, selectItems } = this.props;
    const selection: ItemSelection = {
      selected: selected.filter(value => value !== item),
      available: this.contains(available, item) ? available : [...available, item],
    };
    selectItems(selection);
  };
  private itemToString = (item: SuggestionItem) => (item ? item.value : '');

  public componentDidUpdate(prevProps: Readonly<InternalProps>) {
    const { selected, disabled } = this.props;
    if (prevProps.selected.length !== selected.length || disabled !== prevProps.disabled) {
      this.setState({
        shrink: selected.length !== 0,
        focus: disabled ? false : this.state.focus,
      });
    }
  }

  public render(): React.ReactNode {
    const { classes, selected, label, error, disabled } = this.props;
    const { inputValue, focus } = this.state;
    return (
      <div className={classes.root}>
        <Downshift
          isOpen={focus && !disabled}
          inputValue={inputValue}
          onChange={this.handleChange}
          itemToString={this.itemToString}
          selectedItem={selected}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
          }) => {
            const { onChange, ...inputProps } = getInputProps({
              onKeyDown: this.handleKeyDown,
              onFocus: () => this.setState({ shrink: true, focus: true }),
              onBlur: () =>
                this.setState({ shrink: selected.length !== 0, focus: false, inputValue: '' }),
            });
            return (
              <div className={classes.container}>
                {this.renderInput({
                  error,
                  fullWidth: true,
                  classes,
                  label: label,
                  InputProps: {
                    startAdornment: selected.map(item => (
                      <Chip
                        key={item.id}
                        tabIndex={-1}
                        label={item.name}
                        className={classes.chip}
                        onDelete={this.handleDelete(item)}
                      />
                    )),
                    onChange: event => {
                      this.handleInputChange(event);
                      if (onChange) {
                        onChange(event as React.ChangeEvent<HTMLInputElement>);
                      }
                    },
                  },
                  inputProps,
                })}
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {this.getSuggestions(inputValue2 ? inputValue2 : '', { showEmpty: true }).map(
                      (suggestion, index) =>
                        this.renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion }),
                          highlightedIndex,
                          selectedItem: selectedItem2,
                        })
                    )}
                  </Paper>
                ) : null}
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}
export default AimMultipleSelect;
