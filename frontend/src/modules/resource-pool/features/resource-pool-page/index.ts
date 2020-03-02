import { ResourcePoolPage } from './resource-pool-page';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import { hidePortalOverlay, showPortalOverlay } from '../../../../redux/actions/portal-actions';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import {
  fetchResourceTypesSuggestions,
  resetResourcePoolFormModel,
  resetResourceTypeParameters,
  selectOwners,
  setResourceType,
  updateResourcePoolFormModel,
} from '../../../../redux/actions/resource-pool-create-page-actions';
import { ResourcePoolFormModel } from '../../components/resource-pool-form/resource-pool-form';
import { ResourceTypeSuggestion } from '../../../../redux/reducers/resource-pool-create-page-reducer';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import { fetchAllEmployees } from '../../../../redux/actions/employee_action';
import { ItemSelection } from '../../../../commons/components/aim-multiple-select/aim-multiple-select';
import { fetchPoolTypedSuggestions } from '../../../../redux/actions/request-accept-page-action';

export const mapDispatchToProps = (dispatch: Function) => ({
  fetchPoolSuggestions: (typeId: number) => dispatch(fetchPoolTypedSuggestions.request(typeId)),
  fetchResourceTypesSuggestions: () => dispatch(fetchResourceTypesSuggestions.request()),
  fetchOwnerSuggestions: () => dispatch(fetchAllEmployees.request()),
  selectOwners: (selection: ItemSelection) => dispatch(selectOwners(selection)),
  setResourceTypeParameters: (parameters: ResourceTypeSuggestion) =>
    dispatch(setResourceType(parameters)),
  resetResourceTypeParameters: () => dispatch(resetResourceTypeParameters()),
  resetResourcePoolCreationFormModel: () => dispatch(resetResourcePoolFormModel()),
  updateFormModel: (formModel: ResourcePoolFormModel) =>
    dispatch(updateResourcePoolFormModel(formModel)),
  showOverlay: (text: string) => dispatch(showPortalOverlay(text)),
  hideOverlay: () => dispatch(hidePortalOverlay()),
});

export const mapStateToProps = (state: RootState) => ({
  poolSuggestionList: state.resourcePoolCreatePage.poolSuggestions,
  resourceTypeSuggestionList: state.resourcePoolCreatePage.resourceTypeSuggestion.suggestions,
  availableOwners: state.employees,
  resourceTypeParametersList: state.resourcePoolCreatePage.resourceType
    ? state.resourcePoolCreatePage.resourceType.parameters.filter(
        value => value.modifier === ParameterModifier.POOL_PARAMETER
      )
    : [],
  quantitative: state.resourcePoolCreatePage.resourceType
    ? state.resourcePoolCreatePage.resourceType.quantitative
    : false,
  formModel: state.resourcePoolCreatePage.formModel,
  previousParametersValues: state.resourcePoolCreatePage.previousParametersValues,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(withTranslation('common')(ResourcePoolPage))));
