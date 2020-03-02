import React, { ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';
import { Style } from './styles';
import { FilterValueType } from '../../../../commons/components/aim-data-grid/aim-data-grid';
import { WithTranslation } from 'react-i18next';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import AimAutocomplete from '../../../../commons/components/aim-autocomplete/index';
import { ActiveState } from '../../../../model/active-state';
import { GenericForm } from '../../../../commons/components/generic-fields/generic-form/generic-form';
import {
  BaseFieldConfigI,
  GenericFormValue,
} from '../../../../commons/components/generic-fields/models/field-config.model';
import genericFieldConverterService from '../../../../commons/services/generic-field-converter.service';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Role } from '../../../../commons/role';

export enum FilterField {
  NAME = 'name',
  TYPE = 'type',
  ACTIVE = 'active',
  PARAMS = 'params',
  ONLY_MINE = 'onlyMine',
}

export interface Props {
  role?: string;
  context: { [key: string]: FilterValueType };
  onFiltersChanged?: (data: { [key: string]: FilterValueType }) => void;
  onResourceTypeSelected?: (selectedItem: SuggestionItem) => void;
  getResourceTypeSuggestions?: (value: string) => SuggestionItem[];
  resourceTypeParameters?: FullParameterModel[];
}

export type InternalProps = Props & Style & WithTranslation;

export class ResourcePoolFilterPanel extends React.PureComponent<InternalProps> {
  private readonly stateSuggestions: SuggestionItem[];
  private resParamsConfig: BaseFieldConfigI[] | null = null;

  public constructor(props: InternalProps) {
    super(props);
    this.stateSuggestions = ActiveState;
  }

  public render(): ReactNode {
    const { classes, context, t } = this.props;
    this.resParamsConfig = this.getResourceParametersGenericFormConfig();

    const name = context && context[FilterField.NAME] ? context[FilterField.NAME] + '' : '';
    const resourceType = this.getType(context);
    const active = this.getRequestState(context);
    const onlyMine = this.getOnlyMine(context);
    const params = context && context[FilterField.PARAMS] ? context[FilterField.PARAMS] : {};
    return (
      <div className={classes.container}>
        <TextField
          value={name}
          fullWidth
          onChange={this.handleFilterNameChange}
          label={t('resourcePoolGridPage.grid.columns.name')}
        />

        <AimAutocomplete
          selectedItem={resourceType}
          onValueChange={this.onResourceTypeSelected}
          getSuggestions={this.getResourceTypeSuggestions}
          label={t('createRequestPage.form.resourceType')}
        />

        <AimAutocomplete
          selectedItem={active}
          onValueChange={this.onStatusSelected}
          getSuggestions={this.getStateSuggestions}
          label={t('resourcePoolGridPage.filters.activeState')}
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

        {this.props.role === Role.ADMIN ? (
          <FormControlLabel
            className={classes.checkBox}
            control={
              <Checkbox color="primary" checked={onlyMine} onChange={this.handleCheckBoxChange} />
            }
            label={
              <Typography className={classes.mediumSize}>
                {t('resourcePoolGridPage.filters.myPools')}
              </Typography>
            }
            labelPlacement="start"
          />
        ) : (
          <div />
        )}
      </div>
    );
  }

  private onResourceTypeSelected = (selectedItem: SuggestionItem) => {
    const { context, onResourceTypeSelected } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.TYPE]: selectedItem.key,
      [FilterField.PARAMS]: {},
    });
    if (onResourceTypeSelected && typeof onResourceTypeSelected == 'function') {
      onResourceTypeSelected(selectedItem);
    }
    if (context[FilterField.TYPE]) {
      this.handleResParamsValueChange({});
    }
    this.updateFilters(values);
  };

  private getResourceParametersGenericFormConfig(): BaseFieldConfigI[] | null {
    const { resourceTypeParameters } = this.props;
    return genericFieldConverterService.getResourceParametersGenericFormConfig(
      resourceTypeParameters
    );
  }

  private handleResParamsValueChange = (value: GenericFormValue) => {
    const { context } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.PARAMS]: value,
    });
    this.updateFilters(values);
  };

  private handleFilterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { context } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.NAME]: event.target.value,
    });
    this.updateFilters(values);
  };

  private handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { context } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.ONLY_MINE]: event.target.checked,
    });
    this.updateFilters(values);
  };

  private getResourceTypeSuggestions = (value: string) => {
    const { getResourceTypeSuggestions } = this.props;
    if (!getResourceTypeSuggestions || typeof getResourceTypeSuggestions !== 'function') {
      return [];
    }
    return getResourceTypeSuggestions(value);
  };

  private getRequestState = (context: { [key: string]: FilterValueType }): SuggestionItem => {
    if (context && context[FilterField.ACTIVE] !== undefined) {
      const id = context[FilterField.ACTIVE] ? 1 : 2;
      const item = ActiveState.find(x => x.key === id.toString());
      return item ? item : { key: '0', value: '' };
    }
    return { key: '0', value: '' };
  };

  private getOnlyMine = (context: { [key: string]: FilterValueType }): boolean => {
    if (context && context[FilterField.ONLY_MINE] !== undefined) {
      return Boolean(context[FilterField.ONLY_MINE]);
    }
    return true;
  };

  private getType = (context: { [key: string]: FilterValueType }): SuggestionItem => {
    if (context && context[FilterField.TYPE]) {
      const id = context[FilterField.TYPE];
      if (id) {
        const item = this.getResourceTypeSuggestions('').find(
          x => x.key.toString() === id.toString()
        );
        return item ? item : { key: '0', value: '' };
      }
    }
    return { key: '0', value: '' };
  };

  private onStatusSelected = (selectedItem: SuggestionItem) => {
    const { context } = this.props;
    const values = Object.assign({}, context, {
      [FilterField.ACTIVE]: selectedItem.key === '1',
    });
    this.updateFilters(values);
  };

  private getStateSuggestions = (value: string) => {
    return this.stateSuggestions.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };

  private updateFilters(filters: { [key: string]: FilterValueType }) {
    const { onFiltersChanged } = this.props;
    if (!onFiltersChanged) {
      return;
    }
    onFiltersChanged(filters);
  }
}
