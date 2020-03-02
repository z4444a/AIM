import React, { ReactNode } from 'react';
import { Paper } from '@material-ui/core';
import { Style } from './styles';
import Typography from '@material-ui/core/Typography';
import {
  BaseFieldConfigI,
  ErrorConfig,
  FieldType,
  GenericFieldValue,
  NumberFieldConfigModel,
  TextFieldConfigModel,
} from '../../../../commons/components/generic-fields/models/field-config.model';
import Button from '@material-ui/core/Button';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import AimAutocomplete from '../../../../commons/components/aim-autocomplete/index';
import { WithTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import NumberField from '../../../../commons/components/generic-fields/number-field/index';
import { SettingsFormModel } from '../../../../model/form/settings-from-model';
import parameterConstraintsService from '../../../../commons/services/parameter-constraints.service';
import { Protocols } from '../../../../model/protocol-type';

export interface ErrorFormModel {
  name?: ErrorConfig;
  capacity?: ErrorConfig;
  priority?: ErrorConfig;
  resourceType?: ErrorConfig;
  allocationType?: ErrorConfig;
  ResourceTypesParams?: { [key: string]: ErrorConfig };
}

export interface Props {
  formModel: SettingsFormModel;
  onFormModelChanged: (data: SettingsFormModel) => void;
  onSubmit: (data: SettingsFormModel) => void;
}

export interface ErrorFormModel {
  server?: ErrorConfig;
  port?: ErrorConfig;
  protocol?: ErrorConfig;
  fromEmail?: ErrorConfig;
  password?: ErrorConfig;
}

export interface State {
  errorFormModel: ErrorFormModel;
}

export type InternalProps = Props & Style & WithTranslation;

export class EmailSettingsCard extends React.PureComponent<InternalProps, State> {
  private readonly mainFormConfigList: BaseFieldConfigI[];
  private readonly protocolTypeSuggestions: SuggestionItem[];

  public constructor(props: InternalProps) {
    super(props);
    this.mainFormConfigList = this.getBaseFieldConfigList();
    this.protocolTypeSuggestions = Protocols;
    this.state = {
      errorFormModel: {},
    };
  }

  public render(): ReactNode {
    const { classes, t, formModel } = this.props;
    const { errorFormModel } = this.state;

    return (
      <div className={classes.container}>
        <Paper className={classes.main}>
          <Typography className={classes.header} variant="h5">
            {t('settingsPage.emailSettings.header')}
          </Typography>
          <div className={classes.formLine}>
            <TextField
              fullWidth
              required
              error={errorFormModel && !!errorFormModel.server}
              label={t('settingsPage.emailSettings.form.server')}
              value={formModel && formModel.server ? formModel.server : ''}
              onChange={this.handleServerChange}
            />

            <NumberField
              fieldConfig={{
                className: classes.blockTextField,
                labelConfig: {
                  value: t('settingsPage.emailSettings.form.port'),
                  visible: true,
                },
                error: errorFormModel && errorFormModel.port,
                key: 'port',
                required: true,
                fieldType: FieldType.Number,
                constraints: {
                  minNumberValue: 0,
                },
              }}
              value={formModel && formModel.port ? parseInt(formModel.port, 10) : undefined}
              handlers={{ onValueChange: this.handlePortChange }}
            />
            <AimAutocomplete
              required
              selectedItem={
                formModel
                  ? {
                      key: '0',
                      value: formModel.protocol ? formModel.protocol : '',
                    }
                  : undefined
              }
              error={errorFormModel && !!errorFormModel.protocol}
              onValueChange={this.onProtocolSelected}
              getSuggestions={this.getProtocolTypeSuggestions}
              label={t('settingsPage.emailSettings.form.protocol')}
            />

            <TextField
              fullWidth
              required
              error={errorFormModel && !!errorFormModel.fromEmail}
              label={t('settingsPage.emailSettings.form.fromMail')}
              value={formModel && formModel.fromEmail ? formModel.fromEmail : ''}
              onChange={this.handleFromEmailChange}
            />

            <TextField
              fullWidth
              type={'password'}
              required
              error={errorFormModel && !!errorFormModel.password}
              label={t('settingsPage.emailSettings.form.pwd')}
              value={formModel && formModel.password ? formModel.password : ''}
              onChange={this.handlePasswordChange}
            />
          </div>

          <div className={classes.btnContainer}>
            <Button variant="contained" onClick={this.submitForm}>
              {t('common.complete')}
            </Button>
          </div>
        </Paper>
      </div>
    );
  }

  private getBaseFieldConfigList(): BaseFieldConfigI[] {
    const baseFieldConfigList: BaseFieldConfigI[] = [];
    const server: TextFieldConfigModel = {
      key: 'server',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(server);

    const fromEmail: BaseFieldConfigI = {
      key: 'fromEmail',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(fromEmail);

    const port: NumberFieldConfigModel = {
      key: 'port',
      required: true,
      constraints: {
        minNumberValue: 1,
        maxNumberValue: 1000,
      },
      fieldType: FieldType.Number,
    };
    baseFieldConfigList.push(port);

    const protocol: BaseFieldConfigI = {
      key: 'protocol',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(protocol);

    const password: BaseFieldConfigI = {
      key: 'password',
      required: true,
      fieldType: FieldType.Text,
    };
    baseFieldConfigList.push(password);
    return baseFieldConfigList;
  }

  private handlePortChange = (value: number | undefined) => {
    const { formModel } = this.props;
    const newFormModel: SettingsFormModel = Object.assign({}, formModel);
    newFormModel.port = value ? value.toString() : '';
    this.updateSettings(newFormModel);
  };

  private handleServerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { formModel } = this.props;
    const newFormModel: SettingsFormModel = Object.assign({}, formModel);
    newFormModel.server = event.target.value;
    this.updateSettings(newFormModel);
  };

  private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { formModel } = this.props;
    const newFormModel: SettingsFormModel = Object.assign({}, formModel);
    newFormModel.password = event.target.value;
    this.updateSettings(newFormModel);
  };

  private handleFromEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { formModel } = this.props;
    const newFormModel: SettingsFormModel = Object.assign({}, formModel);
    newFormModel.fromEmail = event.target.value;
    this.updateSettings(newFormModel);
  };

  private getProtocolTypeSuggestions = (value: string) => {
    return this.protocolTypeSuggestions.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };

  private updateSettings(formModel: SettingsFormModel) {
    const { onFormModelChanged } = this.props;
    onFormModelChanged(formModel);
  }

  private onProtocolSelected = (selectedItem: SuggestionItem) => {
    const { formModel } = this.props;
    const newFormModel: SettingsFormModel = Object.assign({}, formModel);
    newFormModel.protocol = selectedItem ? selectedItem.value : undefined;
    this.updateSettings(newFormModel);
  };

  private checkFormConstraints(): boolean {
    const { t, i18n, tReady, formModel } = this.props;

    const formErrorModel: ErrorFormModel | null = parameterConstraintsService.checkConstraints(
      this.mainFormConfigList,
      formModel as { [key: string]: GenericFieldValue },
      { t, i18n, tReady }
    );

    const newErrorModel = Object.assign({}, formErrorModel);
    this.setState({ errorFormModel: newErrorModel });
    return !formErrorModel;
  }

  private submitForm = () => {
    const { onSubmit, formModel } = this.props;
    const isValid = this.checkFormConstraints();
    if (!isValid) {
      return;
    }
    onSubmit(formModel);
  };
}
