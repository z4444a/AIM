import { RequestParams } from '../../../../model/parameters/request-params';
import {
  fetchAllRequests,
  setRequestsPageFilterParam,
} from '../../../../redux/actions/request-actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { RequestsPage } from './requests-page';
import { RootState } from 'typesafe-actions';
import { withTranslation } from 'react-i18next';
import { toggleRequestPageFilterPanel } from '../../../../redux/actions/portal-actions';
import {
  fetchResourceTypesSuggestions,
  resetResourceTypeParameters,
  setResourceTypeParameters,
  updateRequestFilters,
} from '../../../../redux/actions/request-filter-panel-actions';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import { CustomFilterCmpContext } from '../../../../commons/components/aim-data-grid/aim-data-grid';

export const mapStateToProps = (state: RootState) => ({
  requests: state.requests.page,
  typeSuggestions: state.requestFilterPanel.resourceTypeSuggestion.suggestions,
  params: state.requests.params,
  filters: state.requestFilterPanel.filters,
  showFilterPanel: state.portal.requestPageFilterPanelOpen,
  resourceTypeParametersList: state.requestFilterPanel.resourceTypeParameters
    ? state.requestFilterPanel.resourceTypeParameters.parameters.filter(
        value => value.modifier === ParameterModifier.REQUEST_PARAMETER
      )
    : [],
  user: state.tokens !== null ? state.tokens.user : null,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  fetchRequests: (params?: RequestParams) => dispatch(fetchAllRequests.request(params)),
  fetchTypeSuggestions: () => dispatch(fetchResourceTypesSuggestions.request()),
  setResourceTypeParameters: (parameters: FullParameterModel[]) =>
    dispatch(setResourceTypeParameters(parameters)),
  resetResourceTypeParameters: () => dispatch(resetResourceTypeParameters()),
  redirect: (path: string) => dispatch(push(path)),
  toggleFilterPanel: (showFilterPanel: boolean) =>
    dispatch(toggleRequestPageFilterPanel(showFilterPanel)),
  updateFilters: (filters: CustomFilterCmpContext) => dispatch(updateRequestFilters(filters)),
  resetParams: () => dispatch(setRequestsPageFilterParam({ pageSize: 10 })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(RequestsPage));
