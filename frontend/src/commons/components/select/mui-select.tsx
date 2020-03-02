import React from 'react';
import MuiAutosuggest, { MuiAutosuggestProps } from '../autosuggest/mui-autosuggest';
import {
  ChangeEvent,
  InputProps,
  OnSuggestionSelected,
  SuggestionSelectedEventData,
} from 'react-autosuggest';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Clear from '@material-ui/icons/Clear';
import { KnownKeys } from '../conditional-types';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextFieldProps } from '@material-ui/core/TextField';

const styles = createStyles({
  inputRoot: {
    cursor: 'default',
  },
  input: {
    '&::placeholder': {
      fontcolor: 'red',
      opacity: 1,
    },
    cursor: 'default',
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 0,
    width: 50,
  },
  clearIcon: {
    fontSize: 20,
    marginRight: 5,
    display: 'flex',
    '&:hover': {
      color: 'black',
    },
  },
  separator: {
    backgroundColor: 'rgb(204, 204, 204)',
    width: '1px',
    cursor: 'default',
    display: 'flex',
    alignSelf: 'stretch',
  },
  dropdownIcon: {
    display: 'flex',
  },
});

type Styles = WithStyles<'input' | 'inputRoot' | 'adornment' | 'clearIcon' | 'separator'>;

interface InjectedProps<T>
  extends Pick<
    MuiAutosuggestProps<T>,
    Exclude<keyof MuiAutosuggestProps<T>, 'inputProps' | 'onSuggestionSelected'>
  > {
  onSuggestionSelected: OnSuggestionSelected<T>;
  inputProps?: Pick<
    InputProps<T>,
    Exclude<KnownKeys<InputProps<T>>, 'value' | 'onBlur' | 'onChange'>
  > &
    TextFieldProps;
}

interface MuiSelectState<T> {
  value: string;
  selectedSuggestion: T | null;
  shrinkLabel: boolean;
}

type MuiSelectProps<T> = InjectedProps<T> & Styles;

class Inner<T> extends React.Component<MuiSelectProps<T>, MuiSelectState<T>> {
  public constructor(props: MuiSelectProps<T>) {
    super(props);

    this.state = {
      value: '',
      selectedSuggestion: null,
      shrinkLabel: false,
    };
  }

  private input: HTMLInputElement | null = null;

  private handleChange = (event: React.FormEvent, params: ChangeEvent) => {
    this.setState({
      value: params.newValue,
    });
  };

  private handleSuggestionSelection = (
    event: React.FormEvent,
    data: SuggestionSelectedEventData<T>
  ) => {
    this.setState(
      {
        selectedSuggestion: data.suggestion,
        shrinkLabel: true,
        value: '',
      },
      () => this.input && this.input.blur()
    );
    this.props.onSuggestionSelected(event, data);
  };

  private handleBlur = () => {
    this.setState({
      value: '',
      shrinkLabel: !!this.state.selectedSuggestion,
    });
  };

  private storeInputRef = (input: HTMLInputElement) => {
    if (input) {
      this.input = input;
    }
  };

  private handleFocus = () => {
    this.setState({
      shrinkLabel: true,
    });
  };

  private handleClear = () => {
    this.setState({
      selectedSuggestion: null,
      shrinkLabel: false,
    });
  };

  public render(): React.ReactNode {
    const { inputProps, classes, getSuggestionValue, onSuggestionSelected, ...rest } = this.props;
    const { value, selectedSuggestion } = this.state;
    return (
      <MuiAutosuggest<T>
        inputProps={{
          style: {
            cursor: 'default',
          },
          value: value as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onChange: this.handleChange,
          inputRef: this.storeInputRef,
          placeholder: selectedSuggestion ? getSuggestionValue(selectedSuggestion) : '',
          InputProps: {
            endAdornment: (
              <InputAdornment position="end" style={{ cursor: 'default' }}>
                <div className={classes.adornment}>
                  {this.state.selectedSuggestion && (
                    <Clear
                      color="disabled"
                      onClick={this.handleClear}
                      className={classes.clearIcon}
                    />
                  )}
                  <span className={classes.separator} />
                  <ArrowDropDown onClick={() => this.input && this.input.focus()} />
                </div>
              </InputAdornment>
            ),
            classes: {
              root: classes.inputRoot,
              input: classes.input,
            },
          },
          InputLabelProps: {
            shrink: this.state.shrinkLabel,
          },
          ...inputProps,
        }}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.handleSuggestionSelection}
        shouldRenderSuggestions={() => true}
        {...rest}
      />
    );
  }
}

class MuiSelect<T> extends React.Component<
  MuiSelect<T>['C'] extends React.ComponentType<infer P> ? P : never,
  {}
> {
  private readonly C = withStyles(styles)(
    (props: JSX.LibraryManagedAttributes<typeof Inner, Inner<T>['props']>) => (
      <Inner<T> {...props} />
    )
  );
  public render(): React.ReactNode {
    return <this.C {...this.props} />;
  }
}

export default MuiSelect;
