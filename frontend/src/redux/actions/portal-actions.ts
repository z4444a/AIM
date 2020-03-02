import { createAction } from 'typesafe-actions';

export const showPortalSideNavPanel = createAction('PORTAL/SHOW_SIDE_NAV_PANEL');
export const hidePortalSideNavPanel = createAction('PORTAL/HIDE_SIDE_NAV_PANEL');
export const togglePortalSideNavPanel = createAction('PORTAL/TOGGLE_SIDE_NAV_PANEL');
export const showPortalOverlay = createAction(
  'PORTAL/SHOW_PORTAL_OVERLAY',
  action => (text?: string) => action(text)
);
export const hidePortalOverlay = createAction('PORTAL/HIDE_PORTAL_OVERLAY');

export const showEmployeePageFilterPanel = createAction('PORTAL/SHOW_EMPLOYEE_PAGE_FILTER_PANEL');
export const hideEmployeePageFilterPanel = createAction('PORTAL/HIDE_EMPLOYEE_PAGE_FILTER_PANEL');
export const toggleEmployeePageFilterPanel = createAction(
  'PORTAL/TOGGLE_EMPLOYEE_PAGE_FILTER_PANEL',
  action => (showFilterPanel: boolean) => action(showFilterPanel)
);

export const showResourceTypePageFilterPanel = createAction(
  'PORTAL/SHOW_RESOURCE_TYPE_PAGE_FILTER_PANEL'
);
export const hideResourceTypePageFilterPanel = createAction(
  'PORTAL/HIDE_RESOURCE_TYPE_PAGE_FILTER_PANEL'
);
export const toggleResourceTypePageFilterPanel = createAction(
  'PORTAL/TOGGLE_RESOURCE_TYPE_PAGE_FILTER_PANEL',
  action => (showFilterPanel: boolean) => action(showFilterPanel)
);

export const showResourcePoolPageFilterPanel = createAction(
  'PORTAL/SHOW_RESOURCE_POOL_PAGE_FILTER_PANEL'
);
export const hideResourcePoolPageFilterPanel = createAction(
  'PORTAL/HIDE_RESOURCE_POOL_PAGE_FILTER_PANEL'
);
export const toggleResourcePoolPageFilterPanel = createAction(
  'PORTAL/TOGGLE_RESOURCE_POOL_PAGE_FILTER_PANEL',
  action => (showFilterPanel: boolean) => action(showFilterPanel)
);

export const showRequestPageFilterPanel = createAction('PORTAL/SHOW_REQUEST_PAGE_FILTER_PANEL');
export const hideRequestPageFilterPanel = createAction('PORTAL/HIDE_REQUEST_PAGE_FILTER_PANEL');
export const toggleRequestPageFilterPanel = createAction(
  'PORTAL/TOGGLE_REQUEST_PAGE_FILTER_PANEL',
  action => (showFilterPanel: boolean) => action(showFilterPanel)
);
