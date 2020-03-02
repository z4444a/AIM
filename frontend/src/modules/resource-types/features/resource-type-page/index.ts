import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ResourceTypePage } from './resource-type-page';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import {
  addParameterRow,
  changeParametersOrder,
  findParameterIdentifier,
  hideDialog,
  removeParameterRow,
  resetCheckUniqueTypeName,
  resetEditedParameterName,
  resetFormModel,
  resetHighlightEmpty,
  resetParameterFormModel,
  setEditable,
  setEditedParameterName,
  setHighlightEmpty,
  showDialog,
  updateFormModel,
  updateParameterFormModel,
} from '../../../../redux/actions/resource-type-page-actions';
import { RootState } from 'typesafe-actions';
import { ParameterFormModel } from '../../../../model/form/parameter-form-model';
import { TypeFormModel } from '../../../../model/form/type-form-model';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import { checkTypeName } from '../../../../redux/actions/exists-type-name-action';
import { ParameterRowFormModel } from '../../../../model/form/parameter-row-form-model';
import { hidePortalOverlay, showPortalOverlay } from '../../../../redux/actions/portal-actions';
import { fetchResourceTypesSuggestions } from '../../../../redux/actions/resource-pool-create-page-actions';
import { ParameterUniqueFields } from '../../../../model/parameters/parameter-unique-fields';
import { ValidationParameterResponse } from '../../../../model/validation-parameter-response';

export const mapDispatchToProps = (dispatch: Function) => ({
  updateParameterFormModel: (index: number, model: ParameterFormModel) =>
    dispatch(updateParameterFormModel({ key: index, model })),
  removeParameterFormModel: (index: number) => dispatch(removeParameterRow(index)),
  resetParameterFormModel: () => dispatch(resetParameterFormModel()),
  updateFormModel: (type: TypeFormModel) => dispatch(updateFormModel(type)),
  resetFormModel: () => dispatch(resetFormModel()),
  setEditedParameterName: (name: string) => dispatch(setEditedParameterName(name)),
  resetEditedParameterName: () => dispatch(resetEditedParameterName()),
  checkTypeName: (name: string) => dispatch(checkTypeName.request(name)),
  resetCheckUniqueTypeName: () => dispatch(resetCheckUniqueTypeName()),
  setRowEditable: (key: number, editable: boolean) => dispatch(setEditable({ key, editable })),
  addParameterRow: (modifier: ParameterModifier) => dispatch(addParameterRow(modifier)),
  showDialog: () => dispatch(showDialog()),
  hideDialog: () => dispatch(hideDialog()),
  setHighlightEmpty: () => dispatch(setHighlightEmpty()),
  resetHighlightEmpty: () => dispatch(resetHighlightEmpty()),
  redirect: (path: string) => dispatch(push(path)),
  changeOrder: (rows: ParameterRowFormModel[]) => dispatch(changeParametersOrder(rows)),

  onShowOverlay: (text: string) => dispatch(showPortalOverlay(text)),
  onHideOverlay: () => dispatch(hidePortalOverlay()),

  fetchResourceTypesSuggestions: () => dispatch(fetchResourceTypesSuggestions.request()),

  findParamIdentifier: (params: ParameterUniqueFields) =>
    dispatch(findParameterIdentifier.request(params)),
  setValidation: (params: ValidationParameterResponse | null) =>
    dispatch(findParameterIdentifier.success(params)),
});

export const mapStateToProps = (state: RootState) => ({
  typeSuggestions: state.resourcePoolCreatePage.resourceTypeSuggestion.suggestions,
  formModel: state.resourceTypePage.formModel,
  uniqueName: state.resourceTypePage.uniqueName,
  editedParameterName: state.resourceTypePage.editedParameterName,
  parameterRows: state.resourceTypePage.parameterRows,
  dialogIsOpen: state.resourceTypePage.dialogIsOpen,
  highlightEmpty: state.resourceTypePage.highlightEmpty,
  removedParameterResponse: state.resourceTypePage.removedParameterResponse,
  identifierValidation: state.resourceTypePage.identifierValidation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResourceTypePage));
