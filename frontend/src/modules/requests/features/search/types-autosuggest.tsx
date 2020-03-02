import React from 'react';
import MuiAutosuggest from '../../../../commons/components/autosuggest/mui-autosuggest';
import { ChangeEvent, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import { ResourceTypesParams } from '../../../../model/parameters/resource-types-parameters';
import * as _ from 'underscore';

export interface Suggestion {
  label: string;
  value: number;
}

interface DataProps {
  suggestions: Suggestion[] | [];
  onRequestSuggestions: (params?: Partial<ResourceTypesParams>) => void;
  onInputChange: (event: React.FormEvent, params: ChangeEvent) => void;
  onSuggestionClear: () => void;
  fieldValue: string;
}

type Props = DataProps;

class TypesAutosuggest extends React.Component<Props> {
  private readonly debounceFetch: (request: SuggestionsFetchRequestedParams) => void;

  public constructor(props: Readonly<DataProps>) {
    super(props);
    this.state = {
      inputTimeout: setTimeout(() => {}, 0),
    };

    this.debounceFetch = _.debounce(this.handleTypesInputChange, 300);
  }

  private handleTypesInputChange = (request: SuggestionsFetchRequestedParams) => {
    const params = {
      name: request.value,
    };

    this.props.onRequestSuggestions(params);
  };

  private shouldRenderSuggestion = (value: string): boolean => {
    return value.length > 2;
  };

  private handleInputKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  public render(): React.ReactNode {
    const { suggestions, fieldValue, onInputChange } = this.props;

    return (
      <MuiAutosuggest<Suggestion>
        suggestions={suggestions}
        getSuggestionValue={suggestion => suggestion.label}
        onSuggestionsFetchRequested={value => this.debounceFetch(value)}
        onSuggestionsClearRequested={this.props.onSuggestionClear}
        inputProps={{
          value: fieldValue,
          onChange: onInputChange,
          label: 'Название типа',
          onKeyPress: this.handleInputKeyPress,
        }}
        shouldRenderSuggestions={this.shouldRenderSuggestion}
      />
    );
  }
}

export default TypesAutosuggest;
