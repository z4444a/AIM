import React, { ReactNode } from 'react';
import { WithSnackbarProps } from 'notistack';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import { mapDispatchToProps, mapStateToProps } from './index';
import PanelWrapper from '../../../../commons/components/panel-wrapper/index';
import EmailSettingsCard from '../../components/email-settings-card/index';
import { SettingModel } from '../../../../model/base/setting-model';
import { SettingsFormModel } from '../../../../model/form/settings-from-model';

export type InternalProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  Style &
  WithSnackbarProps &
  WithTranslation;

export class SettingsPage extends React.PureComponent<InternalProps> {
  public componentDidMount(): void {
    const { fetchSettings } = this.props;
    fetchSettings('mail');
  }

  public render(): ReactNode {
    const { settings } = this.props;
    return (
      <PanelWrapper>
        <EmailSettingsCard
          formModel={settings}
          onFormModelChanged={this.handleOnFormModelChanged}
          onSubmit={this.handleOnFormSubmit}
        />
      </PanelWrapper>
    );
  }

  private handleOnFormModelChanged = (value: SettingsFormModel) => {
    const { updateFormModel } = this.props;
    updateFormModel(value);
  };

  private handleOnFormSubmit = (value: SettingsFormModel) => {
    const { saveSettings } = this.props;
    const dto: SettingModel[] = [];
    dto.push({ key: 'mail.server', value: value.server ? value.server : 'smtp.relex.ru' });
    dto.push({ key: 'mail.port', value: value.port ? value.port : '465' });
    dto.push({ key: 'mail.protocol', value: value.protocol ? value.protocol : 'None' });
    dto.push({ key: 'mail.fromEmail', value: value.fromEmail ? value.fromEmail : '' });
    dto.push({ key: 'mail.password', value: value.password ? value.password : '' });

    saveSettings(dto);
  };
}
