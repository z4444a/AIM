import React, { ReactNode } from 'react';
import { Paper } from '@material-ui/core';
import { Style } from './styles';
import Typography from '@material-ui/core/Typography';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import {
  BaseFieldConfigI,
  ErrorConfig,
  FieldType,
  GenericFieldValue,
  GenericFormValue,
  NumberFieldConfigModel,
  NumberFieldValue,
  TextFieldConfigModel,
  TextFieldValue,
} from '../../../../commons/components/generic-fields/models/field-config.model';
import Button from '@material-ui/core/Button';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import AimAutocomplete from '../../../../commons/components/aim-autocomplete/index';
import { WithTranslation } from 'react-i18next';
import genericFieldConverterService from '../../../../commons/services/generic-field-converter.service';
import parameterConstraintsService from '../../../../commons/services/parameter-constraints.service';
import TextField from '@material-ui/core/TextField';
import GenericForm from '../../../../commons/components/generic-fields/generic-form/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ResourceAllocationType } from '../../../../model/resource-allocation-type';
import NumberField from '../../../../commons/components/generic-fields/number-field/index';
import NamedModel from '../../../../model/base/named-model';
import { ParameterValueFormModel } from '../../../../model/form/parameter-value-form-model';
import AimMultipleSelect from '../../../../commons/components/aim-multiple-select/index';
import { ItemSelection } from '../../../../commons/components/aim-multiple-select/aim-multiple-select';
import ContentModel from '../../../../model/base/content-model';
import { ParameterValueMapper } from '../../../../commons/services/parameter-value-mapper';
import { ParameterType } from '../../../../model/parameter-type';

interface BasePoolForm {
  name?: TextFieldValue;
  totalCapacity?: number;
  resourceType?: NamedModel;
  allocationTypeId?: ResourceAllocationType;
  parametersValues?: ParameterValueFormModel[];
  active?: boolean;
  monitoring?: boolean;
  description?: TextFieldValue;
  priority?: NumberFieldValue;
}
export interface ResourcePoolFormModel extends BasePoolForm {
  owners: NamedModel[];
}
interface ResourcePoolUncheckedForm extends BasePoolForm {
  owner?: TextFieldValue;
}

export interface ErrorFormModel {
  name?: ErrorConfig;
  capacity?: ErrorConfig;
  priority?: ErrorConfig;
  resourceType?: ErrorConfig;
  allocationTypeId?: ErrorConfig;
  resourceTypeParams?: { [key: string]: ErrorConfig };
  owner?: ErrorConfig;
}

export interface Props {
  formModel: ResourcePoolFormModel;
  previousParametersValues: ParameterValueFormModel[];
  quantitative: boolean;
  onFormModelChanged?: (data: ResourcePoolFormModel) => void;
  resourceTypeParameters?: FullParameterModel[];
  onSubmit?: (data: ResourcePoolFormModel) => void;
  getResourceTypeSuggestions?: (value: string) => SuggestionItem[];
  onResourceTypeSelected?: (selectedItem: SuggestionItem) => void;
  selectOwners: (selection: ItemSelection) => void;
  availableOwners: NamedModel[];
  getPoolSuggestions: (typeId: number) => ContentModel[];
  fetchPoolSuggestionsFromServer: (typeId: number) => void;
}

export interface State {
  errorFormModel: ErrorFormModel;
}
export type InternalProps = Props & Style & WithTranslation;

export class ResourcePoolForm extends React.PureComponent<InternalProps, State> {
  private readonly mainFormConfigList: BaseFieldConfigI[];
  private resParamsConfig: BaseFieldConfigI[] | null = null;
  private readonly resourceTypeAllocationSuggestions: SuggestionItem[];

  public constructor(props: InternalProps) {
    super(props);
    this.mainFormConfigList = this.getBaseFieldConfigList();
    this.resourceTypeAllocationSuggestions = this.getResourceTypeAllocationSuggestions();
    this.state = {
      errorFormModel: {},
    };
  }

  public render(): ReactNode {
    const {
      classes,
      t,
      formModel,
      quantitative,
      availableOwners,
      fetchPoolSuggestionsFromServer,
    } = this.props;
    const { errorFormModel } = this.state;
    this.resParamsConfig = this.getResourceParametersGenericFormConfig();
    let genericValue: GenericFormValue = {};
    if (formModel.parametersValues) {
      genericValue = ParameterValueMapper.mapToGenericFormValue(formModel.parametersValues);
    }
    return (
      <Paper
        classes={{
          root: classes.container,
        }}
      >
        <div>
          <Typography variant="h5">{t('resourcePoolPage.header')}</Typography>
          <div className={`${classes.formLine} ${classes.resourceTypeLine}`}>
            <TextField
              fullWidth
              required
              error={errorFormModel && !!errorFormModel.name}
              label={t('resourcePoolPage.form.name')}
              value={formModel.name as string}
              onChange={this.handleNameChange}
            />
          </div>
          <div className={classes.formLine}>
            <AimAutocomplete
              required
              selectedItem={
                formModel.resourceType
                  ? {
                      key: formModel.resourceType.id.toString(),
                      value: formModel.resourceType.name,
                    }
                  : undefined
              }
              error={errorFormModel && !!errorFormModel.resourceType}
              onValueChange={this.onResourceTypeSelected}
              getSuggestions={this.getResourceTypeSuggestions}
              label={t('createRequestPage.form.resourceType')}
            />
          </div>
          <div className={classes.formLine}>
            <AimMultipleSelect
              required
              available={availableOwners}
              selected={formModel.owners}
              selectItems={this.handleOwnerSelect}
              label={t('resourcePoolPage.form.owners')}
              error={errorFormModel && !!errorFormModel.owner}
            />
          </div>
          <div className={`${classes.composeLine} ${classes.formLine}`}>
            {quantitative && (
              <NumberField
                fieldConfig={{
                  className: classes.blockTextField,
                  labelConfig: {
                    value: t('resourcePoolPage.form.capacity'),
                    visible: true,
                  },
                  key: 'capacity',
                  error: errorFormModel && errorFormModel.capacity,
                  required: true,
                  fieldType: FieldType.Number,
                  constraints: {
                    minNumberValue: 0,
                  },
                }}
                value={formModel.totalCapacity}
                handlers={{ onValueChange: this.handleCapacityChange }}
              />
            )}
            <NumberField
              fieldConfig={{
                className: classes.blockTextField,
                labelConfig: {
                  value: t('resourcePoolPage.form.priority'),
                  visible: true,
                },
                error: errorFormModel && errorFormModel.priority,
                key: 'capacity',
                required: true,
                fieldType: FieldType.Number,
                constraints: {
                  minNumberValue: 0,
                },
              }}
              value={formModel.priority}
              handlers={{ onValueChange: this.handlePriorityChange }}
              toolTipTitle={t('resourcePoolPage.tooltips.priority')}
            />
            <AimAutocomplete
              required
              selectedItem={
                formModel.allocationTypeId
                  ? this.resourceTypeAllocationSuggestions.find(
                      a => a.key === `${formModel.allocationTypeId}`
                    )
                  : undefined
              }
              className={classes.extTextField}
              error={errorFormModel && !!errorFormModel.allocationTypeId}
              onValueChange={this.onResourceAllocationTypeSelected}
              getSuggestions={this.getResourceAllocationTypeSuggestions}
              label={t('createRequestPage.form.resourceAllocationType')}
            />
            <div className={classes.checkBoxLeft}>
              <FormControlLabel
                control={
                  <Checkbox checked={formModel.monitoring} onChange={this.handleMonitoringChange} />
                }
                label={t('resourcePoolPage.form.monitoring')}
              />
            </div>

            <div className={classes.checkBoxRight}>
              <FormControlLabel
                control={<Checkbox checked={formModel.active} onChange={this.handleActiveChange} />}
                label={t('resourcePoolPage.form.active')}
              />
            </div>
          </div>

          <div className={classes.formLine}>
            <TextField
              label={t('resourcePoolPage.form.description')}
              multiline
              fullWidth
              rows="3"
              onChange={this.handleDescriptionChange}
              value={formModel.description ? (formModel.description as string) : ''}
            />
          </div>

          <div className={classes.formLine}>
            {this.resParamsConfig ? (
              <GenericForm
                fieldConfigList={this.resParamsConfig}
                value={genericValue as GenericFormValue}
                errorConfig={errorFormModel.resourceTypeParams}
                handlers={{
                  onValueChange: this.handleResParamsValueChange,
                  onFieldRender: (param: number) => fetchPoolSuggestionsFromServer(param),
                }}
                needTooltip={true}
              />
            ) : (
              formModel.resourceType && (
                <div className={classes.noParamsMessageContainer}>
                  <Typography variant="overline" color="secondary">
                    {t('resourcePoolPage.messages.noParams')}
                  </Typography>
                </div>
              )
            )}
          </div>
          <div className={classes.btnContainer}>
            <Button variant="contained" onClick={this.submitForm}>
              {t('common.complete')}
            </Button>
          </div>
        </div>
      </Paper>
    );
  }

  private handleOwnerSelect = (selection: ItemSelection) => {
    const { selectOwners, formModel } = this.props;
    const newErrorModel: ErrorFormModel = Object.assign({}, this.state.errorFormModel);
    newErrorModel.owner = undefined;
    this.setState({
      errorFormModel: newErrorModel,
    });
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.owners = selection.selected;
    this.updateFormModel(newFormModel);
    selectOwners(selection);
  };
  private getBaseFieldConfigList(): BaseFieldConfigI[] {
    const baseFieldConfigList: BaseFieldConfigI[] = [];
    const name: TextFieldConfigModel = {
      key: 'name',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(name);

    if (this.props.quantitative) {
      const capacity: NumberFieldConfigModel = {
        key: 'capacity',
        required: true,
        constraints: {
          minNumberValue: 1,
          maxNumberValue: 1000,
        },
        fieldType: FieldType.Number,
      };
      baseFieldConfigList.push(capacity);
    }

    const allocationTypeId: NumberFieldConfigModel = {
      key: 'allocationTypeId',
      required: true,
      constraints: {
        minNumberValue: 1,
        maxNumberValue: 3,
      },
      fieldType: FieldType.Number,
    };
    baseFieldConfigList.push(allocationTypeId);

    const priority: NumberFieldConfigModel = {
      key: 'priority',
      required: false,
      constraints: {
        minNumberValue: 1,
        maxNumberValue: 1000,
      },
      fieldType: FieldType.Number,
    };
    baseFieldConfigList.push(priority);

    const resourceTypeId: BaseFieldConfigI = {
      key: 'resourceType',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(resourceTypeId);

    const owner: BaseFieldConfigI = {
      key: 'owner',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(owner);
    return baseFieldConfigList;
  }

  private updateParametersToShowTypesAndPools(): FullParameterModel[] | undefined {
    const { resourceTypeParameters, t, getPoolSuggestions } = this.props;
    if (!resourceTypeParameters || resourceTypeParameters.length === 0) {
      return resourceTypeParameters;
    }
    const parameterList = resourceTypeParameters.map(param => {
      const newParam = Object.assign({}, param);
      const typeAsString = param.parameterType.toString().toLocaleLowerCase();
      const localTypeName = t(`parameterType.${typeAsString}`).toLocaleLowerCase();
      newParam.name = param.name + ' (' + localTypeName + ')';
      if (param.parameterType === ParameterType.POOL) {
        const constraint = Object.assign({}, param.constraint);
        constraint.listValues = getPoolSuggestions(param.poolTypeId ? param.poolTypeId : -1);
        newParam.constraint = constraint;
      }
      return newParam;
    });
    return parameterList;
  }
  private getResourceParametersGenericFormConfig(): BaseFieldConfigI[] | null {
    const resourceTypeParameters = this.updateParametersToShowTypesAndPools();
    return genericFieldConverterService.getResourceParametersGenericFormConfig(
      resourceTypeParameters
    );
  }
  private getResourceTypeAllocationSuggestions(): SuggestionItem[] {
    const { t } = this.props;
    const result: SuggestionItem[] = [];
    result.push({
      key: `${ResourceAllocationType.AUTO}`,
      value: t('allocationType.auto'),
    });
    result.push({
      key: `${ResourceAllocationType.MANUAL}`,
      value: t('allocationType.manual'),
    });
    result.push({
      key: `${ResourceAllocationType.SEMI_AUTO}`,
      value: t('allocationType.semiAuto'),
    });

    return result;
  }

  private getResourceTypeSuggestions = (value: string) => {
    const { getResourceTypeSuggestions } = this.props;
    if (!getResourceTypeSuggestions || typeof getResourceTypeSuggestions !== 'function') {
      return [];
    }
    return getResourceTypeSuggestions(value);
  };

  private getResourceAllocationTypeSuggestions = (value: string) => {
    return this.resourceTypeAllocationSuggestions.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };

  private onResourceTypeSelected = (selectedItem: SuggestionItem) => {
    const { onResourceTypeSelected, formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.resourceType = selectedItem
      ? {
          id: parseInt(selectedItem.key),
          name: selectedItem.value,
        }
      : undefined;
    this.updateFormModel(newFormModel);
    if (!onResourceTypeSelected || typeof onResourceTypeSelected !== 'function') {
      return;
    }
    onResourceTypeSelected(selectedItem);
  };

  private onResourceAllocationTypeSelected = (selectedItem: SuggestionItem) => {
    const { formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.allocationTypeId = selectedItem ? +selectedItem.key : undefined;
    this.updateFormModel(newFormModel);
  };

  private submitForm = () => {
    const { onSubmit, formModel } = this.props;
    const isValid = this.checkFormConstraints();
    if (!onSubmit || typeof onSubmit !== 'function' || !isValid) {
      return;
    }
    onSubmit(formModel);
  };

  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.name = event.target.value;
    this.updateFormModel(newFormModel);
  };

  private handleMonitoringChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.monitoring = checked;
    this.updateFormModel(newFormModel);
  };

  private handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.active = checked;
    this.updateFormModel(newFormModel);
  };

  private handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.description = event.target.value;
    this.updateFormModel(newFormModel);
  };

  private handleCapacityChange = (value: number | undefined, key: string) => {
    const { formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.totalCapacity = value;
    this.updateFormModel(newFormModel);
  };

  private handlePriorityChange = (value: number | undefined, key: string) => {
    const { formModel } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    newFormModel.priority = value;
    this.updateFormModel(newFormModel);
  };

  private handleResParamsValueChange = (value: GenericFormValue) => {
    const { formModel, resourceTypeParameters, previousParametersValues } = this.props;
    const newFormModel: ResourcePoolFormModel = Object.assign({}, formModel);
    const parameters = resourceTypeParameters ? resourceTypeParameters : [];
    newFormModel.parametersValues = ParameterValueMapper.mapToParameterValues(
      value,
      parameters,
      previousParametersValues
    );
    this.updateFormModel(newFormModel);
  };

  private checkFormConstraints(): boolean {
    const { t, i18n, tReady, formModel } = this.props;

    let genericValue: GenericFormValue = {};
    if (formModel.parametersValues) {
      genericValue = ParameterValueMapper.mapToGenericFormValue(formModel.parametersValues);
    }
    const uncheckedForm: ResourcePoolUncheckedForm = Object.assign({}, formModel as BasePoolForm);
    uncheckedForm.owner =
      formModel.owners && formModel.owners.length >= 1 && formModel.owners[0]
        ? formModel.owners[0].name
        : '';
    const formErrorModel: ErrorFormModel | null = parameterConstraintsService.checkConstraints(
      this.mainFormConfigList,
      uncheckedForm as { [key: string]: GenericFieldValue },
      { t, i18n, tReady }
    );
    const resourceTypeParamsErrorModel: ErrorFormModel | null = parameterConstraintsService.checkMultipleConstraints(
      this.resParamsConfig ? this.resParamsConfig : [],
      genericValue as { [key: string]: GenericFieldValue[] },
      { t, i18n, tReady }
    );
    const newErrorModel = Object.assign({}, formErrorModel, {
      resourceTypeParams: resourceTypeParamsErrorModel,
    });

    this.setState({ errorFormModel: newErrorModel });

    return !formErrorModel && !resourceTypeParamsErrorModel;
  }

  private updateFormModel(formModel: ResourcePoolFormModel) {
    const { onFormModelChanged } = this.props;
    if (!onFormModelChanged || typeof onFormModelChanged !== 'function') {
      return;
    }
    onFormModelChanged(formModel);
  }
}
