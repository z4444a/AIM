import React, { ReactNode } from 'react';
import { WithSnackbarProps } from 'notistack';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import ResourcePoolForm from '../../components/resource-pool-form/index';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import { mapDispatchToProps, mapStateToProps } from './index';
import { ResourcePoolFormModel } from '../../components/resource-pool-form/resource-pool-form';
import PanelWrapper from '../../../../commons/components/panel-wrapper/index';
import { PoolFormModel } from '../../../../model/form/pool-form-model';
import { CurrentUser } from '../../../../model/current-user';
import { ItemSelection } from '../../../../commons/components/aim-multiple-select/aim-multiple-select';
import NamedModel from '../../../../model/base/named-model';
import ContentModel from '../../../../model/base/content-model';
import { PoolCreateModel } from '../../../../model/create/pool-create-model';

export interface Props {
  onFormSubmit: (pool: PoolFormModel) => void;
  user?: CurrentUser;
}

export type InternalProps = Props &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  Style &
  WithSnackbarProps &
  WithTranslation;

export class ResourcePoolPage extends React.PureComponent<InternalProps> {
  public componentDidMount(): void {
    const { fetchResourceTypesSuggestions, fetchOwnerSuggestions } = this.props;
    fetchResourceTypesSuggestions();
    fetchOwnerSuggestions();
  }

  public componentWillUnmount(): void {
    const { resetResourceTypeParameters, resetResourcePoolCreationFormModel } = this.props;
    resetResourcePoolCreationFormModel();
    resetResourceTypeParameters();
  }

  public constructor(props: InternalProps) {
    super(props);
    this.addCurrentUserAsDefaultOwner(props);
  }

  public render(): ReactNode {
    const {
      classes,
      resourceTypeParametersList,
      formModel,
      quantitative,
      availableOwners,
      selectOwners,
      previousParametersValues,
      fetchPoolSuggestions,
    } = this.props;
    return (
      <PanelWrapper>
        <div className={classes.container}>
          <ResourcePoolForm
            availableOwners={availableOwners}
            selectOwners={selectOwners}
            formModel={formModel}
            previousParametersValues={previousParametersValues}
            quantitative={quantitative}
            getResourceTypeSuggestions={this.getResourceTypeSuggestions}
            onResourceTypeSelected={this.handleResourceTypeSelected}
            onFormModelChanged={this.handleOnFormModelChanged}
            resourceTypeParameters={resourceTypeParametersList}
            onSubmit={this.handleOnFormSubmit}
            getPoolSuggestions={this.getPoolSuggestions}
            fetchPoolSuggestionsFromServer={fetchPoolSuggestions}
          />
        </div>
      </PanelWrapper>
    );
  }
  private getPoolSuggestions = (typeId: number): ContentModel[] => {
    const { poolSuggestionList } = this.props;
    return poolSuggestionList
      .filter(item => item.typeId === typeId)
      .map(item => {
        const contentItem: ContentModel = {
          id: item.id,
          content: item.name,
        };
        return contentItem;
      });
  };
  private addCurrentUserAsDefaultOwner(props: InternalProps) {
    const { user, selectOwners, formModel, availableOwners, updateFormModel } = props;
    const selected = formModel.owners;
    if (!user || formModel.owners.length !== 0) {
      return;
    }
    const item: NamedModel = {
      id: user.id,
      name: user.fullName,
    };
    const selection: ItemSelection = {
      selected: [...selected, item],
      available: availableOwners.filter(value => value !== item),
    };
    const newForm: ResourcePoolFormModel = Object.assign({}, formModel);
    newForm.owners = selection.selected;
    updateFormModel(newForm);
    selectOwners(selection);
  }
  private getResourceTypeSuggestions = (value: string) => {
    const { resourceTypeSuggestionList } = this.props;
    const result: SuggestionItem[] =
      !resourceTypeSuggestionList || resourceTypeSuggestionList.length === 0
        ? []
        : resourceTypeSuggestionList.map(item => {
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

  private handleOnFormModelChanged = (value: ResourcePoolFormModel) => {
    const { updateFormModel } = this.props;
    updateFormModel(value);
  };

  private handleResourceTypeSelected = (value: SuggestionItem) => {
    const {
      resetResourceTypeParameters,
      setResourceTypeParameters,
      resourceTypeSuggestionList,
    } = this.props;
    if (value && value.key) {
      const type = resourceTypeSuggestionList.find(item => item.id === value.key);
      if (type) {
        setResourceTypeParameters(type);
      }
    } else {
      resetResourceTypeParameters();
    }
  };

  private handleOnFormSubmit = (value: ResourcePoolFormModel) => {
    const { onFormSubmit } = this.props;
    if (
      !value ||
      !value.resourceType ||
      !value.name ||
      value.active == null ||
      value.monitoring == null ||
      !value.allocationTypeId ||
      (this.props.quantitative && value.totalCapacity == null)
    ) {
      throw new Error('required parameters are not filled');
    }
    const dto: PoolCreateModel = {
      ...value,
      resourceTypeId: value.resourceType.id,
    };
    onFormSubmit(dto);
  };
}
