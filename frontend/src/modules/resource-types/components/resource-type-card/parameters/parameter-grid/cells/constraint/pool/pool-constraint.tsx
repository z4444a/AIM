import { PureComponent } from 'react';
import { WithTranslation } from 'react-i18next';
import React from 'react';
import AimAutocomplete from '../../../../../../../../../commons/components/aim-autocomplete/index';
import { Style } from './styles';
import { ResourceTypeSuggestion } from '../../../../../../../../../redux/reducers/request-create-page-reducer';
import { SuggestionItem } from '../../../../../../../../../commons/components/aim-autocomplete/aim-autocomplete';

export interface Props {
  onTypeSelected: (id: number) => void;
  typeSuggestions: ResourceTypeSuggestion[];
  selectedTypeId?: number;
  editable?: boolean;
}
export type InternalProps = Props & WithTranslation & Style;

export class PoolConstraint extends PureComponent<InternalProps> {
  public render(): React.ReactNode {
    const { selectedTypeId, t, classes, editable } = this.props;
    return (
      <div className={classes.inputField}>
        <AimAutocomplete
          disabled={!editable}
          required
          selectedItem={this.getSelected()}
          error={!selectedTypeId}
          onValueChange={this.onValueChange}
          getSuggestions={this.getSuggestions}
          label={t('createRequestPage.form.resourceType')}
          helperText={selectedTypeId ? undefined : t('constraints.requiredField')}
        />
      </div>
    );
  }
  private getSuggestions = (value: string) => {
    const { typeSuggestions } = this.props;
    const result: SuggestionItem[] =
      !typeSuggestions || typeSuggestions.length === 0
        ? []
        : typeSuggestions.map(item => {
            const suggestionItem: SuggestionItem = {
              value: item.name,
              key: item.id,
            };
            return suggestionItem;
          });
    return result.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };

  private getSelected = () => {
    const { typeSuggestions, selectedTypeId } = this.props;
    const selected = typeSuggestions.find(item => +item.id === selectedTypeId);
    if (selected) {
      return {
        value: selected.name,
        key: selected.id,
      };
    }
    return selected;
  };

  private onValueChange = (item: SuggestionItem) => {
    //TODO: show warning if a saved parameter type is changed
    const { onTypeSelected } = this.props;
    onTypeSelected(+item.key);
  };
}
