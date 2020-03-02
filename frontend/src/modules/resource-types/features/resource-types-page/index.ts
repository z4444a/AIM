import { ResourceTypesParams } from '../../../../model/parameters/resource-types-parameters';
import { fetchAllResourceTypes } from '../../../../redux/actions/resource-type-actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { ResourceTypesPage } from './resource-types-page';
import { withTranslation } from 'react-i18next';
import { toggleResourceTypePageFilterPanel } from '../../../../redux/actions/portal-actions';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RequestParams } from '../../../../model/parameters/request-params';
import { setRequestsPageFilterParam } from '../../../../redux/actions/request-actions';

export const mapStateToProps = (state: RootState) => ({
  datasource: state.resourceTypes.page,
  params: state.resourceTypes.params,
  showFilterPanel: state.portal.resourceTypePageFilterPanelOpen,
  requestParams: state.requests.params,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  setRedirectFilter: (param: RequestParams) => dispatch(setRequestsPageFilterParam(param)),
  fetch: (params?: ResourceTypesParams) => dispatch(fetchAllResourceTypes.request(params)),
  redirect: (path: string) => dispatch(push(path)),
  toggleFilterPanel: (showFilterPanel: boolean) =>
    dispatch(toggleResourceTypePageFilterPanel(showFilterPanel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation('common')(ResourceTypesPage)));
