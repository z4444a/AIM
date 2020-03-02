import React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { RequestParams } from '../../../../model/parameters/request-params';
import { ResourceTypesParams } from '../../../../model/parameters/resource-types-parameters';
import TypesAutosuggest from './types-autosuggest';
import { ChangeEvent } from 'react-autosuggest';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing.unit,
    },
    item: {
      width: '100%',
      marginTop: theme.spacing.unit,
    },
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
  | 'container'
  | 'item'
  | 'autosuggestContainer'
  | 'suggestionsContainerOpen'
  | 'suggestion'
  | 'suggestionsList'
>;

interface Suggestion {
  label: string;
  value: number;
}

interface Props {
  types: Suggestion[] | [];
  onTypesChange: (params?: Partial<ResourceTypesParams>) => void;
  onSearchClick: (params?: Partial<RequestParams>) => void;
  onTypesSuggestionClear: () => void;
}

interface State {
  typesFieldValue: string;
}

/**
 * Presents filtering options for request table.
 */
class RequestSearchFrom extends React.Component<Styles & Props, State> {
  public constructor(props: Readonly<Styles & Props>) {
    super(props);
    this.state = {
      typesFieldValue: '',
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleTypesInputChange = this.handleTypesInputChange.bind(this);
  }

  private handleSearchClick() {
    const params: Partial<RequestParams> = {
      typeName: this.state.typesFieldValue,
    };
    this.props.onSearchClick(params);
  }

  private handleTypesInputChange(event: React.FormEvent, { newValue }: ChangeEvent) {
    this.setState({
      typesFieldValue: newValue,
    });
  }

  public render(): React.ReactNode {
    const { classes, types } = this.props;

    if (!types) {
      return null;
    }

    return (
      <form className={classes.container}>
        <FormLabel>Поиск</FormLabel>
        <Divider />
        <TypesAutosuggest
          fieldValue={this.state.typesFieldValue}
          suggestions={types}
          onInputChange={this.handleTypesInputChange}
          onRequestSuggestions={this.props.onTypesChange}
          onSuggestionClear={this.props.onTypesSuggestionClear}
        />
        <Button className={classes.item} variant="contained" onClick={this.handleSearchClick}>
          Искать
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(RequestSearchFrom);
