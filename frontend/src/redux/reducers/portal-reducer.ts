import { combineReducers } from 'redux';
import { getType, RootAction } from 'typesafe-actions';
import actions from '../actions/index';
import { hidePortalOverlay, showPortalOverlay } from '../actions/portal-actions';

export interface PortalOverlayState {
  active: boolean;
  text?: string;
}

const getDefaultPortalOverlay = () => {
  const state: PortalOverlayState = {
    active: false,
  };

  return state;
};

const sideNavIsOpen = (state = true, action: RootAction) => {
  switch (action.type) {
    case getType(actions.portal.hidePortalSideNavPanel):
      return false;
    case getType(actions.portal.showPortalSideNavPanel):
      return true;
    case getType(actions.portal.togglePortalSideNavPanel):
      return !state;
    default:
      return state;
  }
};

const portalOverlay = (
  state: PortalOverlayState = getDefaultPortalOverlay(),
  action: RootAction
) => {
  switch (action.type) {
    case getType(showPortalOverlay):
      return { active: true, text: action.payload };
    case getType(hidePortalOverlay):
      return { active: false };
    default:
      return state;
  }
};

const employeePageFilterPanelOpen = (state = true, action: RootAction) => {
  switch (action.type) {
    case getType(actions.portal.hideEmployeePageFilterPanel):
      return false;
    case getType(actions.portal.showEmployeePageFilterPanel):
      return true;
    case getType(actions.portal.toggleEmployeePageFilterPanel):
      return action.payload;
    default:
      return state;
  }
};

const requestPageFilterPanelOpen = (state = true, action: RootAction) => {
  switch (action.type) {
    case getType(actions.portal.hideRequestPageFilterPanel):
      return false;
    case getType(actions.portal.showRequestPageFilterPanel):
      return true;
    case getType(actions.portal.toggleRequestPageFilterPanel):
      return action.payload;
    default:
      return state;
  }
};

const resourceTypePageFilterPanelOpen = (state = true, action: RootAction) => {
  switch (action.type) {
    case getType(actions.portal.hideResourceTypePageFilterPanel):
      return false;
    case getType(actions.portal.showResourceTypePageFilterPanel):
      return true;
    case getType(actions.portal.toggleResourceTypePageFilterPanel):
      return action.payload;
    default:
      return state;
  }
};

const resourcePoolPageFilterPanelOpen = (state = true, action: RootAction) => {
  switch (action.type) {
    case getType(actions.portal.hideResourcePoolPageFilterPanel):
      return false;
    case getType(actions.portal.showResourcePoolPageFilterPanel):
      return true;
    case getType(actions.portal.toggleResourcePoolPageFilterPanel):
      return action.payload;
    default:
      return state;
  }
};

const portalReducer = combineReducers({
  sideNavIsOpen,
  portalOverlay,
  employeePageFilterPanelOpen,
  requestPageFilterPanelOpen,
  resourceTypePageFilterPanelOpen,
  resourcePoolPageFilterPanelOpen,
});

export default portalReducer;
