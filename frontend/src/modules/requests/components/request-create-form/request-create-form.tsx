import React, { ReactNode } from 'react';
import { Paper } from '@material-ui/core';
import { Style } from './styles';
import Typography from '@material-ui/core/Typography';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import {
  BaseFieldConfigI,
  DateFieldValue,
  ErrorConfig,
  FieldType,
  GenericFieldValue,
  GenericFormValue,
  NumberFieldConfigModel,
  NumberFieldValue,
  TextFieldConfigModel,
  TextFieldValue,
} from '../../../../commons/components/generic-fields/models/field-config.model';
import { GenericForm } from '../../../../commons/components/generic-fields/generic-form/generic-form';
import Button from '@material-ui/core/Button';
import AimDatePicker from '../../../../commons/components/date-picker/aim-date-picker';
import AimAutocomplete from '../../../../commons/components/aim-autocomplete/index';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import { WithTranslation } from 'react-i18next';
import { Moment } from 'moment';
import TextField from '@material-ui/core/TextField';
import genericFieldConverterService from '../../../../commons/services/generic-field-converter.service';
import parameterConstraintsService from '../../../../commons/services/parameter-constraints.service';
import NumberField from '../../../../commons/components/generic-fields/number-field/index';
import { Role } from '../../../../commons/role';
import NamedModel from '../../../../model/base/named-model';

export interface CreateRequestFormModel {
  name?: TextFieldValue;
  startDate?: DateFieldValue | null;
  endDate?: DateFieldValue | null;
  resourceTypeId?: TextFieldValue;
  amount?: NumberFieldValue;
  resourceTypeParams?: GenericFormValue;
  projectId?: TextFieldValue;
  author?: NamedModel;
}

export interface ErrorFormModel {
  name?: ErrorConfig;
  startDate?: ErrorConfig;
  endDate?: ErrorConfig;
  resourceTypeId?: ErrorConfig;
  resourceTypeParams?: { [key: string]: ErrorConfig };
  amount?: ErrorConfig;
  projectId?: ErrorConfig;
}

export interface Props {
  role?: string;
  formModel: CreateRequestFormModel;
  onFormModelChanged?: (data: CreateRequestFormModel) => void;
  resourceTypeParameters?: FullParameterModel[];
  onSubmit?: (data: CreateRequestFormModel) => void;
  onClose: () => void;
  getResourceTypeSuggestions?: (value: string) => SuggestionItem[];
  getAuthorSuggestions?: (value: string) => SuggestionItem[];
  onResourceTypeSelected?: (selectedItem: SuggestionItem) => void;
  quantitative: boolean;
  getProjectSuggestions?: (value: string) => SuggestionItem[];
  setAmount: (form: CreateRequestFormModel, id: string) => void;
}

export interface State {
  errorFormModel: ErrorFormModel;
  project?: SuggestionItem;
  type?: SuggestionItem;
}

export type InternalProps = Props & Style & WithTranslation;

export class RequestCreateForm extends React.PureComponent<InternalProps, State> {
  private mainFormConfigList: BaseFieldConfigI[] = [];
  private resParamsConfig: BaseFieldConfigI[] | null = null;
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      errorFormModel: {},
      project: undefined,
      type: undefined,
    };
  }
  public componentWillMount(): void {
    const { project } = this.state;
    const projectSuggestions = this.getProjectSuggestions('');
    if (projectSuggestions.length === 1 && !project) {
      this.setState({
        project: projectSuggestions[0],
      });
      this.onProjectSelected(projectSuggestions[0]);
    }
  }

  public render(): ReactNode {
    const { classes, t, formModel, quantitative } = this.props;
    const { errorFormModel, project, type } = this.state;
    this.mainFormConfigList = this.getBaseFieldConfigList();
    this.resParamsConfig = this.getResourceParametersGenericFormConfig();
    return (
      <Paper
        classes={{
          root: classes.container,
        }}
      >
        <div>
          <Typography variant="h5">{t('createRequestPage.header')}</Typography>
          <div className={classes.suggestLine}>
            <AimAutocomplete
              selectedItem={type}
              required
              error={errorFormModel && !!errorFormModel.resourceTypeId}
              helperText={
                errorFormModel.resourceTypeId ? errorFormModel.resourceTypeId.value : undefined
              }
              onValueChange={this.onResourceTypeSelected}
              getSuggestions={this.getResourceTypeSuggestions}
              label={t('createRequestPage.form.resourceType')}
            />
          </div>

          {this.props.role === Role.ADMIN ? (
            <div className={classes.suggestLine}>
              <AimAutocomplete
                selectedItem={
                  formModel.author
                    ? {
                        key: formModel.author.id.toString(),
                        value: formModel.author.name,
                      }
                    : undefined
                }
                required
                //error={errorFormModel && !!errorFormModel.resourceTypeId}
                helperText={
                  errorFormModel.resourceTypeId ? errorFormModel.resourceTypeId.value : undefined
                }
                onValueChange={this.onAuthorSelected}
                getSuggestions={this.getAuthorSuggestions}
                label={t('createRequestPage.form.owner')}
              />
            </div>
          ) : (
            <div />
          )}

          <div className={classes.suggestLine}>
            <AimAutocomplete
              selectedItem={project}
              error={errorFormModel && !!errorFormModel.projectId}
              helperText={errorFormModel.projectId ? errorFormModel.projectId.value : undefined}
              onValueChange={this.onProjectSelected}
              getSuggestions={this.getProjectSuggestions}
              label={t('requestPage.grid.columns.project')}
            />
          </div>
          <div className={`${classes.formLine} ${classes.dateRangeContainer}`}>
            <AimDatePicker
              required
              error={errorFormModel && !!errorFormModel.startDate}
              helperText={errorFormModel.startDate ? errorFormModel.startDate.value : undefined}
              label={t('createRequestPage.form.startDate')}
              value={formModel.startDate}
              onChange={this.handleStartDateChange}
            />
            <AimDatePicker
              required
              error={errorFormModel && !!errorFormModel.endDate}
              helperText={errorFormModel.endDate ? errorFormModel.endDate.value : undefined}
              label={t('createRequestPage.form.endDate')}
              value={formModel.endDate}
              onChange={this.handleEndDateChange}
            />
          </div>
          <div className={classes.formLine}>
            <TextField
              fullWidth
              required
              error={errorFormModel && !!errorFormModel.name}
              helperText={errorFormModel.name ? errorFormModel.name.value : undefined}
              label={t('createRequestPage.form.name')}
              value={formModel.name as string}
              onChange={this.handleNameChange}
            />
          </div>
          {quantitative && (
            <div className={classes.formLine}>
              <NumberField
                fieldConfig={{
                  fullWidth: true,
                  labelConfig: {
                    value: t('requestPage.grid.columns.amount'),
                    visible: true,
                  },
                  key: 'capacity',
                  error: errorFormModel && errorFormModel.amount,
                  required: true,
                  fieldType: FieldType.Number,
                  constraints: {
                    minNumberValue: 0,
                  },
                }}
                value={formModel.amount}
                handlers={{ onValueChange: this.handleCapacityChange }}
              />
            </div>
          )}
          {this.resParamsConfig && (
            <GenericForm
              fieldConfigList={this.resParamsConfig}
              value={formModel.resourceTypeParams as GenericFormValue}
              errorConfig={errorFormModel.resourceTypeParams}
              handlers={{
                onValueChange: this.handleResParamsValueChange,
              }}
              needTooltip={true}
            />
          )}
          <div className={classes.btnContainer}>
            <Button variant="contained" onClick={this.closeForm}>
              {t('common.cancel')}
            </Button>
            <Button
              className={classes.creationButton}
              variant="contained"
              onClick={this.submitForm}
            >
              {t('createRequestPage.submitBtn')}
            </Button>
          </div>
        </div>
      </Paper>
    );
  }

  private getBaseFieldConfigList(): BaseFieldConfigI[] {
    const { quantitative } = this.props;
    const baseFieldConfigList: BaseFieldConfigI[] = [];
    const name: TextFieldConfigModel = {
      key: 'name',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(name);
    const startDate: BaseFieldConfigI = {
      key: 'startDate',
      required: true,
      fieldType: FieldType.Date,
    };
    baseFieldConfigList.push(startDate);
    const endDate: BaseFieldConfigI = {
      key: 'endDate',
      required: true,
      fieldType: FieldType.Date,
    };
    baseFieldConfigList.push(endDate);
    const resourceTypeId: BaseFieldConfigI = {
      key: 'resourceTypeId',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(resourceTypeId);
    const projectId: BaseFieldConfigI = {
      key: 'projectId',
      required: false,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(projectId);
    if (quantitative) {
      const amount: NumberFieldConfigModel = {
        key: 'amount',
        required: true,
        constraints: {
          minNumberValue: 1,
          maxNumberValue: 1000,
        },
        fieldType: FieldType.Number,
      };
      baseFieldConfigList.push(amount);
    }
    return baseFieldConfigList;
  }

  private getResourceParametersGenericFormConfig(): BaseFieldConfigI[] | null {
    const parameterList = this.updateParametersToShowTypes();
    return genericFieldConverterService.getResourceParametersGenericFormConfig(parameterList);
  }

  private updateParametersToShowTypes(): FullParameterModel[] | undefined {
    const { resourceTypeParameters, t } = this.props;
    if (!resourceTypeParameters || resourceTypeParameters.length === 0) {
      return resourceTypeParameters;
    }
    const parameterList = resourceTypeParameters.map(param => {
      const newParam = Object.assign({}, param);
      const typeAsString = param.parameterType.toString().toLocaleLowerCase();
      const localTypeName = t(`parameterType.${typeAsString}`).toLocaleLowerCase();
      newParam.name = param.name + ' (' + localTypeName + ')';
      return newParam;
    });
    return parameterList;
  }

  private getResourceTypeSuggestions = (value: string) => {
    const { getResourceTypeSuggestions } = this.props;
    if (!getResourceTypeSuggestions || typeof getResourceTypeSuggestions !== 'function') {
      return [];
    }
    return getResourceTypeSuggestions(value);
  };
  private getAuthorSuggestions = (value: string) => {
    const { getAuthorSuggestions } = this.props;
    if (!getAuthorSuggestions || typeof getAuthorSuggestions !== 'function') {
      return [];
    }
    return getAuthorSuggestions(value);
  };
  private onResourceTypeSelected = (selectedItem: SuggestionItem) => {
    const { onResourceTypeSelected, formModel, setAmount } = this.props;
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.resourceTypeId = selectedItem ? selectedItem.key : undefined;
    this.updateFormModel(newFormModel);
    if (!onResourceTypeSelected || typeof onResourceTypeSelected !== 'function') {
      return;
    }
    this.setState({
      type: selectedItem,
    });
    onResourceTypeSelected(selectedItem);
    setAmount(newFormModel, selectedItem.key);
  };
  private onAuthorSelected = (selectedItem: SuggestionItem) => {
    const { formModel } = this.props;
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.author = selectedItem
      ? {
          id: parseInt(selectedItem.key),
          name: selectedItem.value,
        }
      : undefined;
    this.updateFormModel(newFormModel);
  };
  private getProjectSuggestions = (value: string) => {
    const { getProjectSuggestions } = this.props;
    if (!getProjectSuggestions || typeof getProjectSuggestions !== 'function') {
      return [];
    }
    return getProjectSuggestions(value);
  };
  private onProjectSelected = (selectedItem: SuggestionItem) => {
    const { formModel } = this.props;
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.projectId = selectedItem ? selectedItem.key : undefined;
    this.setState({
      project: selectedItem,
    });
    this.updateFormModel(newFormModel);
  };

  private closeForm = () => {
    const { onClose } = this.props;
    onClose();
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
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.name = event.target.value;
    this.updateFormModel(newFormModel);
  };
  private handleResParamsValueChange = (value: GenericFormValue) => {
    const { formModel } = this.props;
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.resourceTypeParams = value;
    this.updateFormModel(newFormModel);
  };
  private handleStartDateChange = (date: Moment) => {
    const { formModel } = this.props;
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.startDate = date.toDate();
    this.updateFormModel(newFormModel);
  };
  private handleEndDateChange = (date: Moment) => {
    const { formModel } = this.props;
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.endDate = date.toDate();
    this.updateFormModel(newFormModel);
  };
  private handleCapacityChange = (value: number | undefined, key: string) => {
    const { formModel } = this.props;
    const newFormModel: CreateRequestFormModel = Object.assign({}, formModel);
    newFormModel.amount = value;
    this.updateFormModel(newFormModel);
  };

  private checkFormConstraints(): boolean {
    const { t, i18n, tReady, formModel } = this.props;
    if (!this.mainFormConfigList) {
      return false;
    }
    const formErrorModel: ErrorFormModel | null = parameterConstraintsService.checkConstraints(
      this.mainFormConfigList,
      formModel as { [key: string]: GenericFieldValue },
      { t, i18n, tReady }
    );
    const resourceTypeParamsErrorModel: ErrorFormModel | null = parameterConstraintsService.checkMultipleConstraints(
      this.resParamsConfig ? this.resParamsConfig : [],
      formModel.resourceTypeParams as { [key: string]: GenericFieldValue[] },
      { t, i18n, tReady }
    );
    const newErrorModel = Object.assign({}, formErrorModel, {
      resourceTypeParams: resourceTypeParamsErrorModel,
    });

    this.setState({ errorFormModel: newErrorModel });

    return !formErrorModel && !resourceTypeParamsErrorModel;
  }

  private updateFormModel(formModel: CreateRequestFormModel) {
    const { onFormModelChanged } = this.props;
    if (!onFormModelChanged || typeof onFormModelChanged !== 'function') {
      return;
    }
    onFormModelChanged(formModel);
  }
}
