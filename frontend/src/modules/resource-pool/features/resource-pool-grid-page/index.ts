import ResourcePoolParams from '../../../../commons/parameters/resource-pool-parameters';
import { fetchAllResourcePool } from '../../../../redux/actions/resource-pool-actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { ResourcePoolGridPage } from './resource-pool-grid-page';
import { RootState } from 'typesafe-actions';
import { withTranslation } from 'react-i18next';
import { toggleResourcePoolPageFilterPanel } from '../../../../redux/actions/portal-actions';
import { CustomFilterCmpContext } from '../../../../commons/components/aim-data-grid/aim-data-grid';
import { updatePoolsFilters } from '../../../../redux/actions/pool-filter-panel-actions';
import {
  fetchResourceTypesSuggestions,
  resetResourceTypeParameters,
  setResourceTypeParameters,
} from '../../../../redux/actions/request-filter-panel-actions';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import FullParameterModel from '../../../../model/get/full-parameter-model';

export const mapStateToProps = (state: RootState) => ({
  datasource: state.resourcePool.page,
  params: state.resourcePool.params,
  role: state.tokens && state.tokens.user ? state.tokens.user.role : undefined,
  updatePool: state.updatePool,
  showFilterPanel: state.portal.resourcePoolPageFilterPanelOpen,
  filters: state.poolFilterPanel.filters,
  typeSuggestions: state.poolFilterPanel.resourceTypeSuggestion.suggestions,
  resourceTypeParametersList: state.requestFilterPanel.resourceTypeParameters
    ? state.requestFilterPanel.resourceTypeParameters.parameters.filter(
        value => value.modifier === ParameterModifier.POOL_PARAMETER
      )
    : [],
});

export const mapDispatchToProps = (dispatch: Function) => ({
  fetch: (params?: ResourcePoolParams) => dispatch(fetchAllResourcePool.request(params)),
  redirect: (path: string) => dispatch(push(path)),
  toggleFilterPanel: (showFilterPanel: boolean) =>
    dispatch(toggleResourcePoolPageFilterPanel(showFilterPanel)),
  updateFilters: (filters: CustomFilterCmpContext) => dispatch(updatePoolsFilters(filters)),
  fetchTypeSuggestions: () => dispatch(fetchResourceTypesSuggestions.request()),
  setResourceTypeParameters: (parameters: FullParameterModel[]) =>
    dispatch(setResourceTypeParameters(parameters)),
  resetResourceTypeParameters: () => dispatch(resetResourceTypeParameters()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(ResourcePoolGridPage));
