import { RequestCreatePage } from './request-create-page';
import { RootState } from 'typesafe-actions';
import {
  createNewRequest,
  fetchAuthorSuggestions,
  fetchProjectSuggestions,
  fetchResourceTypesSuggestions,
  resetRequestCreationFormModel,
  resetRequestCreationStatus,
  resetResourceTypeParameters,
  setQuantitative,
  setResourceTypeParameters,
  updateResourceTypeFormModel,
} from '../../../../redux/actions/request-create-page-actions';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { CreateRequestFormModel } from '../../components/request-create-form/request-create-form';
import { CreateRequestDto } from '../../../../model/create/create-request-dto';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import { hidePortalOverlay, showPortalOverlay } from '../../../../redux/actions/portal-actions';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import { ParameterModifier } from '../../../../model/parameter-modifier';

export const mapDispatchToProps = (dispatch: Function) => ({
  fetchResourceTypesSuggestions: () => dispatch(fetchResourceTypesSuggestions.request()),
  fetchAuthorSuggestions: () => dispatch(fetchAuthorSuggestions.request()),
  setResourceTypeParameters: (parameters: FullParameterModel[]) =>
    dispatch(setResourceTypeParameters(parameters)),
  resetResourceTypeParameters: () => dispatch(resetResourceTypeParameters()),
  updateFormModel: (formModel: CreateRequestFormModel) =>
    dispatch(updateResourceTypeFormModel(formModel)),
  createNewRequest: (dto: CreateRequestDto) => dispatch(createNewRequest.request(dto)),
  resetRequestCreationStatus: () => dispatch(resetRequestCreationStatus()),
  resetRequestCreationFormModel: () => dispatch(resetRequestCreationFormModel()),
  showOverlay: (text: string) => dispatch(showPortalOverlay(text)),
  hideOverlay: () => dispatch(hidePortalOverlay()),
  setQuantitative: (value: boolean) => dispatch(setQuantitative(value)),
  fetchProjectSuggestions: () => dispatch(fetchProjectSuggestions.request()),
});

export const mapStateToProps = (state: RootState) => ({
  resourceTypeSuggestionList: state.requestCreatePage.resourceTypeSuggestion.suggestions,
  authorSuggestionList: state.requestCreatePage.authorSuggestion.suggestions,
  projectSuggestionList: state.requestCreatePage.projectSuggestions,
  resourceTypeParametersList: state.requestCreatePage.resourceTypeParameters.parameters.filter(
    value => value.modifier === ParameterModifier.REQUEST_PARAMETER
  ),
  user: state.tokens ? state.tokens.user : undefined,
  resourceTypeParametersLoading: state.requestCreatePage.resourceTypeParameters.loading,
  formModel: state.requestCreatePage.formModel,
  requestCreationStatus: state.requestCreatePage.requestCreationStatus.status,
  quantitative: state.requestCreatePage.isTypeQuantitative,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(withTranslation('common')(RequestCreatePage))));
