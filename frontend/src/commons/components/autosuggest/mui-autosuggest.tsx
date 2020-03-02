import Autosuggest, {
  AutosuggestProps,
  InputProps,
  RenderSuggestionParams,
} from 'react-autosuggest';
import React, { ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) =>
  createStyles({
    autosuggestContainer: {
      position: 'relative',
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
  });

type Styles = WithStyles<
  'autosuggestContainer' | 'suggestionsContainerOpen' | 'suggestion' | 'suggestionsList'
>;

function renderInputComponent<TSuggestion>(inputProps: InputProps<TSuggestion>): React.ReactNode {
  const { inputRef = () => {}, defaultValue, onChange, ref, InputProps, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      variant="standard"
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        ...InputProps,
      }}
      defaultValue={defaultValue as string}
      onChange={
        onChange as (
          event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => void
      }
      {...other}
    />
  );
}

export interface MuiAutosuggestProps<T>
  extends Pick<
    AutosuggestProps<T>,
    Exclude<keyof AutosuggestProps<T>, 'inputProps' | 'renderSuggestion'>
  > {
  inputProps: MuiAutosuggestInputProps<T>;
}

interface MuiAutosuggestInputProps<T> extends InputProps<T> {
  inputRef?: React.Ref<HTMLInputElement> | React.RefObject<HTMLInputElement>;
}

type Props<T> = MuiAutosuggestProps<T> & Styles;

class Inner<T> extends React.Component<Props<T>> {
  private renderSuggestion = (suggestion: T, { isHighlighted }: RenderSuggestionParams) => {
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>{this.props.getSuggestionValue(suggestion)}</div>
      </MenuItem>
    );
  };

  public render(): React.ReactNode {
    const { classes, ...other } = this.props;

    return (
      <Autosuggest<T>
        theme={{
          container: classes.autosuggestContainer,
          suggestion: classes.suggestion,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
        }}
        onSuggestionsClearRequested={() => {}}
        renderInputComponent={renderInputComponent}
        renderSuggestion={this.renderSuggestion}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
        {...other}
      />
    );
  }
}

class MuiAutosuggest<T> extends React.Component<
  MuiAutosuggest<T>['C'] extends React.ComponentType<infer P> ? P : never,
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

export default MuiAutosuggest;
