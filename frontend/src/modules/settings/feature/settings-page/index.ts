import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { SettingsPage } from './settings-page';
import { SettingModel } from '../../../../model/base/setting-model';
import { fetchSettingsByGroup, saveSettings } from '../../../../redux/actions/settings-actions';
import { updateSettings } from '../../../../redux/actions/settings-page-actions';
import { SettingsFormModel } from '../../../../model/form/settings-from-model';
import { hidePortalOverlay, showPortalOverlay } from '../../../../redux/actions/portal-actions';

export const mapDispatchToProps = (dispatch: Function) => ({
  saveSettings: (data: SettingModel[]) => dispatch(saveSettings.request(data)),
  fetchSettings: (data: string) => dispatch(fetchSettingsByGroup.request(data)),
  updateFormModel: (formModel: SettingsFormModel) => dispatch(updateSettings(formModel)),
  showOverlay: (text: string) => dispatch(showPortalOverlay(text)),
  hideOverlay: () => dispatch(hidePortalOverlay()),
});

export const mapStateToProps = (state: RootState) => ({
  settings: state.settingsPage.formModel,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(withTranslation('common')(SettingsPage))));
