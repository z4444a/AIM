import React, { ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';
import { Style } from './styles';
import { FilterValueType } from '../../../../commons/components/aim-data-grid/aim-data-grid';
import { WithTranslation } from 'react-i18next';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import { RequestStatuses } from '../../../../model/request-status';
import AimAutocomplete from '../../../../commons/components/aim-autocomplete/index';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import {
  BaseFieldConfigI,
  GenericFormValue,
} from '../../../../commons/components/generic-fields/models/field-config.model';
import genericFieldConverterService from '../../../../commons/services/generic-field-converter.service';
import { GenericForm } from '../../../../commons/components/generic-fields/generic-form/generic-form';

export enum FilterField {
  RESOURCE_TYPE = 'typeName',
  DESCRIPTION = 'description',
  STATUS = 'statusId',
  PARAMS = 'params',
}

export interface Props {
  context: { [key: string]: FilterValueType };
  onFiltersChanged?: (data: { [key: string]: FilterValueType }) => void;
  onResourceTypeSelected?: (selectedItem: SuggestionItem) => void;
  getResourceTypeSuggestions?: (value: string) => SuggestionItem[];
  resourceTypeParameters?: FullParameterModel[];
}

export type InternalProps = Props & Style & WithTranslation;

export class RequestFilterPanel extends React.PureComponent<InternalProps> {
  private readonly protocolTypeSuggestions: SuggestionItem[];
  private resParamsConfig: BaseFieldConfigI[] | null = null;

  public constructor(props: InternalProps) {
    super(props);
    this.protocolTypeSuggestions = RequestStatuses(this.props.t);
  }

  public render(): ReactNode {
    const { classes, context, t } = this.props;
    this.resParamsConfig = this.getResourceParametersGenericFormConfig();
    const resourceType = this.getType(context);
    const description =
      context && context[FilterField.DESCRIPTION] ? context[FilterField.DESCRIPTION] + '' : '';
    const status = this.getRequestStatus(context);
    const params = context && context[FilterField.PARAMS] ? context[FilterField.PARAMS] : {};
    return (
      <div className={classes.container}>
        <AimAutocomplete
          selectedItem={resourceType}
          onValueChange={this.onResourceTypeSelected}
          getSuggestions={this.getResourceTypeSuggestions}
          label={t('createRequestPage.form.resourceType')}
        />

        <TextField
          value={description}
          fullWidth
          onChange={this.handleFilterDescriptionChange}
          label={t('requestPage.grid.columns.description')}
        />

        <AimAutocomplete
          selectedItem={status}
          onValueChange={this.onStatusSelected}
          getSuggestions={this.getProtocolTypeSuggestions}
          label={t('requestPage.grid.columns.status')}
        />

        {this.resParamsConfig ? (
          <GenericForm
            fieldConfigList={this.resParamsConfig}
            value={params as GenericFormValue}
            handlers={{
              onValueChange: this.handleResParamsValueChange,
            }}
            needTooltip={true}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }

  private getResourceParametersGenericFormConfig(): BaseFieldConfigI[] | null {
    const { resourceTypeParameters } = this.props;
    return genericFieldConverterService.getResourceParametersGenericFormConfig(
      resourceTypeParameters
    );
  }

  private getRequestStatus = (context: { [key: string]: FilterValueType }): SuggestionItem => {
    if (context && context[FilterField.STATUS]) {
      const id = context[FilterField.STATUS];
      if (id) {
        const item = RequestStatuses(this.props.t).find(x => x.key === id.toString());
        return item ? item : { key: '0', value: '' };
      }
    }
    return { key: '0', value: '' };
  };

  private getType = (context: { [key: string]: FilterValueType }): SuggestionItem => {
    if (context && context[FilterField.RESOURCE_TYPE]) {
      const id = context[FilterField.RESOURCE_TYPE];
      if (id) {
        const item = this.getResourceTypeSuggestions('').find(
          x => x.key.toString() === id.toString()
        );
        return item ? item : { key: '0', value: '' };
      }
    }
    return { key: '0', value: '' };
  };

  private getProtocolTypeSuggestions = (value: string) => {
    return this.protocolTypeSuggestions.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };

  private onResourceTypeSelected = (selectedItem: SuggestionItem) => {
    const { context, onResourceTypeSelected } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.RESOURCE_TYPE]: selectedItem.key,
      [FilterField.PARAMS]: {},
    });
    if (onResourceTypeSelected && typeof onResourceTypeSelected == 'function') {
      onResourceTypeSelected(selectedItem);
    }
    if (context[FilterField.RESOURCE_TYPE]) {
      this.handleResParamsValueChange({});
    }
    this.updateFilters(values);
  };

  private getResourceTypeSuggestions = (value: string) => {
    const { getResourceTypeSuggestions } = this.props;
    if (!getResourceTypeSuggestions || typeof getResourceTypeSuggestions !== 'function') {
      return [];
    }
    return getResourceTypeSuggestions(value);
  };

  private handleFilterDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { context } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.DESCRIPTION]: event.target.value,
    });
    this.updateFilters(values);
  };

  private handleResParamsValueChange = (value: GenericFormValue) => {
    const { context } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.PARAMS]: value,
    });
    this.updateFilters(values);
  };

  private onStatusSelected = (selectedItem: SuggestionItem) => {
    const { context } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.STATUS]: selectedItem.key,
    });
    this.updateFilters(values);
  };

  private updateFilters(filters: { [key: string]: FilterValueType }) {
    const { onFiltersChanged } = this.props;
    if (!onFiltersChanged) {
      return;
    }
    onFiltersChanged(filters);
  }
}
