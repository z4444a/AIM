import React from 'react';
import { Dialog, DialogTitle, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { WithTranslation } from 'react-i18next';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import { GenericForm } from '../../../../commons/components/generic-fields/generic-form/generic-form';
import {
  BaseFieldConfigI,
  ErrorConfig,
  FieldType,
  GenericFieldValue,
  GenericFormValue,
  TextFieldConfigModel,
} from '../../../../commons/components/generic-fields/models/field-config.model';
import genericFieldConverterService from '../../../../commons/services/generic-field-converter.service';
import parameterConstraintsService from '../../../../commons/services/parameter-constraints.service';
import TextField from '@material-ui/core/TextField';
import NamedModel from '../../../../model/base/named-model';
import AimAutocomplete from '../../../../commons/components/aim-autocomplete/index';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';

export interface Props {
  open: boolean;
  close: () => void;
  submit: (poolId: number, values?: GenericFormValue, comment?: string) => void;
  fetchParameters: () => void;
  parameters: FullParameterModel[];
  values?: GenericFormValue;
  updateValues: (values: GenericFormValue) => void;
  comment: string;
  updateComment: (content: string) => void;
  resetComment: () => void;
  selectedPool: NamedModel | null;
  onPoolSelected: (pool: NamedModel) => void;
  suggestions: NamedModel[];
}
export interface ErrorState {
  pool?: ErrorConfig;
  comment?: ErrorConfig;
  resourceTypeParams?: { [key: string]: ErrorConfig };
}
export type InternalProps = Props & WithStyles & WithTranslation;

export class AcceptDialog extends React.PureComponent<InternalProps, ErrorState> {
  private readonly mainFormConfigList: BaseFieldConfigI[];
  private resParamsConfig: BaseFieldConfigI[] | null = null;

  public constructor(props: InternalProps) {
    super(props);
    this.mainFormConfigList = this.getBaseFieldConfigList();
    this.state = {};
  }

  public componentDidMount(): void {
    const { fetchParameters } = this.props;
    fetchParameters();
  }

  public componentWillUnmount(): void {
    const { resetComment } = this.props;
    resetComment();
  }

  public componentWillUpdate(nextProps: Readonly<InternalProps>): void {
    const { selectedPool, suggestions, onPoolSelected } = nextProps;
    if (
      (selectedPool === null || this.props.suggestions !== suggestions) &&
      suggestions.length !== 0
    ) {
      onPoolSelected(suggestions[0]);
    }
  }

  public render(): React.ReactNode {
    this.resParamsConfig = this.getResourceParametersGenericFormConfig();
    const { open, classes, t, close, values, comment, selectedPool } = this.props;
    const { resourceTypeParams } = this.state;
    const error = this.state;
    const header = t('requestAcceptPage.headers.accept');
    return (
      <Dialog open={open} maxWidth="md">
        <DialogTitle>{header}</DialogTitle>
        <DialogContent className={classes.paper}>
          <AimAutocomplete
            required
            selectedItem={
              selectedPool !== null
                ? {
                    key: selectedPool.id.toString(),
                    value: selectedPool.name,
                  }
                : undefined
            }
            error={error && !!error.pool}
            helperText={error.pool ? error.pool.value : undefined}
            onValueChange={this.selectPool}
            getSuggestions={this.getPoolSuggestions}
            label={t('requestPage.grid.columns.pool')}
          />
          {this.resParamsConfig && (
            <GenericForm
              fieldConfigList={this.resParamsConfig}
              value={values as GenericFormValue}
              errorConfig={resourceTypeParams}
              handlers={{
                onValueChange: this.handleResParamsValueChange,
              }}
              needTooltip={true}
            />
          )}
          <TextField
            fullWidth
            multiline
            error={!!error.comment}
            className={classes.formLine}
            helperText={error.comment ? error.comment.value : undefined}
            label={t('requestAcceptPage.label.comment')}
            value={comment}
            onChange={this.handleCommentChange}
          />
          <div className={classes.buttonsPosition}>
            <Button onClick={close}>{t('common.cancel')}</Button>
            <Button onClick={this.submit}>{t('common.complete')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  private getBaseFieldConfigList(): BaseFieldConfigI[] {
    const baseFieldConfigList: BaseFieldConfigI[] = [];
    const comment: TextFieldConfigModel = {
      key: 'comment',
      required: false,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(comment);
    const pool: TextFieldConfigModel = {
      key: 'pool',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(pool);
    return baseFieldConfigList;
  }
  private getResourceParametersGenericFormConfig(): BaseFieldConfigI[] | null {
    const { parameters } = this.props;
    return genericFieldConverterService.getResourceParametersGenericFormConfig(parameters);
  }
  private handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { updateComment } = this.props;
    updateComment(event.target.value);
  };
  private handleResParamsValueChange = (value: GenericFormValue) => {
    const { updateValues } = this.props;
    updateValues(value);
  };

  private checkFormConstraints(): boolean {
    const { t, i18n, tReady, values, comment, selectedPool } = this.props;
    const form = {
      comment,
      pool: selectedPool !== null ? selectedPool.name : '',
    };
    const formErrorModel: ErrorState | null = parameterConstraintsService.checkConstraints(
      this.mainFormConfigList,
      form,
      { t, i18n, tReady }
    );
    const resourceTypeParamsErrorModel: ErrorState | null = parameterConstraintsService.checkMultipleConstraints(
      this.resParamsConfig ? this.resParamsConfig : [],
      values as { [key: string]: GenericFieldValue[] },
      { t, i18n, tReady }
    );
    const newErrorModel = Object.assign({}, formErrorModel, {
      resourceTypeParams: resourceTypeParamsErrorModel,
    });

    this.setState(newErrorModel);

    return !formErrorModel && !resourceTypeParamsErrorModel;
  }

  private submit = () => {
    const { submit, values, comment, selectedPool } = this.props;
    const isValid = this.checkFormConstraints();
    if (!isValid || selectedPool === null) {
      return;
    }
    submit(selectedPool.id, values, comment);
  };

  private getPoolSuggestions = (value: string) => {
    const { suggestions } = this.props;
    const comparableValue = value.toLocaleLowerCase();
    return !!suggestions
      ? suggestions
          .filter(item => item.name.toLocaleLowerCase().includes(comparableValue))
          .map(item => this.mapToSuggestionItem(item))
      : [];
  };

  private mapToSuggestionItem(model: NamedModel): SuggestionItem {
    return {
      value: model.name,
      key: model.id.toString(),
    };
  }

  private selectPool = (item: SuggestionItem) => {
    const { onPoolSelected } = this.props;
    const pool: NamedModel = {
      id: +item.key,
      name: item.value,
    };
    onPoolSelected(pool);
  };
}
