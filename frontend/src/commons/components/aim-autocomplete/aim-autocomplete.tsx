import React, { ReactNode } from 'react';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import { Style } from './styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export interface SuggestionItem {
  key: string;
  value: string;
}

export interface Props {
  selectedItem?: SuggestionItem;
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  getSuggestions?: (value: string) => SuggestionItem[];
  onValueChange?: (selectedItem: SuggestionItem) => void;
  disabled?: boolean;
}

export type InternalProps = Props & Style;

export class AimAutocomplete extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const {
      classes,
      selectedItem,
      label,
      required,
      error,
      helperText,
      className,
      disabled,
    } = this.props;
    return (
      <Downshift
        selectedItem={selectedItem ? selectedItem : null}
        onChange={this.handleOnChange}
        itemToString={this.itemToString}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
          openMenu,
        }) => (
          <div className={[className ? className : '', classes.container].join(' ')}>
            {this.renderInput({
              fullWidth: true,
              classes,
              label: label ? label : '',
              required: required,
              error,
              helperText,
              InputProps: getInputProps({ onFocus: openMenu }),
              disabled: disabled,
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {this.getSuggestions(inputValue).map((suggestion, index) =>
                    this.renderSuggestion(
                      suggestion,
                      index,
                      getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem
                    )
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderInput(inputProps: any) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  private getSuggestions(value: string | null): SuggestionItem[] {
    const inputValue = (value ? value : '').trim().toLowerCase();
    const { getSuggestions } = this.props;
    if (!getSuggestions || typeof getSuggestions !== 'function') {
      return [];
    }
    return getSuggestions(inputValue);
  }

  private renderSuggestion(
    suggestion: SuggestionItem,
    index: number,
    itemProps: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    highlightedIndex: number | null,
    selectedItem: SuggestionItem
  ) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedItem && suggestion && selectedItem.key === suggestion.key;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.key}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {suggestion.value}
      </MenuItem>
    );
  }

  private handleOnChange = (selectedItem: SuggestionItem) => {
    const { onValueChange } = this.props;
    if (!onValueChange || typeof onValueChange !== 'function') {
      return;
    }
    onValueChange(selectedItem);
  };

  private itemToString = (item: SuggestionItem) => (item ? item.value : '');
}
