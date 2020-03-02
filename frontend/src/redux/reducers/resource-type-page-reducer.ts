import { RootAction } from 'typesafe-actions/dist/create-reducer';
import { ParameterType } from '../../model/parameter-type';
import {
  addParameterRow,
  changeParametersOrder,
  checkUniqueTypeName,
  findParameterIdentifier,
  findParameterValue,
  hideDialog,
  removeParameterRow,
  resetCheckUniqueTypeName,
  resetEditedParameterName,
  resetFormModel,
  resetHighlightEmpty,
  resetParameterFormModel,
  resetRemoveParameterResponse,
  setEditable,
  setEditedParameterName,
  setHighlightEmpty,
  setParameterFormModels,
  showDialog,
  updateFormModel,
  updateParameterFormModel,
} from '../actions/resource-type-page-actions';
import { getType } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { TypeFormModel } from '../../model/form/type-form-model';
import { ParameterFormModel } from '../../model/form/parameter-form-model';
import _ from 'underscore';
import { ParameterRowFormModel } from '../../model/form/parameter-row-form-model';
import { ParameterModifier } from '../../model/parameter-modifier';
import { fetchType } from '../actions/type-action';
import { ValidationParameterResponse } from '../../model/validation-parameter-response';

const getDefaultFormModel = (): TypeFormModel => {
  return {
    name: '',
    description: '',
    active: true,
    needsBackup: false,
    quantitative: false,
    parameters: [],
    picture: {
      picture: [],
      picturePath: '',
    },
  };
};

const getDefaultParameterFormModel = (
  modifier: ParameterModifier,
  order: number
): ParameterFormModel => {
  return {
    name: '',
    identifier: '',
    required: false,
    modifier: modifier,
    parameterType: ParameterType.NUMBER,
    constraint: {},
    order: order,
  };
};

const formModel = (
  state: TypeFormModel = getDefaultFormModel(),
  action: RootAction
): TypeFormModel => {
  switch (action.type) {
    case getType(fetchType.success):
      return action.payload;
    case getType(updateFormModel):
      return action.payload;
    case getType(resetFormModel):
      return getDefaultFormModel();
    default:
      return state;
  }
};

const previousModelState = (
  state: TypeFormModel = getDefaultFormModel(),
  action: RootAction
): TypeFormModel => {
  switch (action.type) {
    case getType(fetchType.success):
      return action.payload;
    case getType(resetFormModel):
      return getDefaultFormModel();
    default:
      return state;
  }
};

const uniqueName = (state = true, action: RootAction): boolean => {
  switch (action.type) {
    case getType(checkUniqueTypeName):
      return !action.payload;
    case getType(resetCheckUniqueTypeName):
      return true;
    default:
      return state;
  }
};

const parameterRows = (
  state: ParameterRowFormModel[] = [],
  action: RootAction
): ParameterRowFormModel[] => {
  const newState: ParameterRowFormModel[] = _.clone(state);
  let rowIndex: number;
  let newRow: ParameterRowFormModel | undefined;

  switch (action.type) {
    case getType(addParameterRow):
      const newKey =
        newState
          .map(row => row.key)
          .reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), -1) + 1;
      newState.push({
        key: newKey,
        editable: true,
        model: getDefaultParameterFormModel(action.payload, newKey),
      });
      return newState;
    case getType(removeParameterRow):
      const index = newState.findIndex(row => row.key === action.payload);
      newState.splice(index, 1);
      return newState;
    case getType(setEditable):
      const { key: key1, editable } = action.payload;
      rowIndex = newState.findIndex(row => row.key === key1);
      newRow = newState[rowIndex];
      if (newRow) {
        newRow = {
          ...newRow,
          editable: editable,
        };
      }
      newState[rowIndex] = newRow;
      return newState;
    case getType(updateParameterFormModel):
      const { key, model } = action.payload;
      rowIndex = newState.findIndex(row => row.key === key);
      newRow = newState[rowIndex];
      if (newRow) {
        newRow = {
          ...newRow,
          model: model,
        };
      }
      newState[rowIndex] = newRow;
      return newState;
    case getType(setParameterFormModels):
      return action.payload.map((parameter, index) => ({
        key: index,
        editable: false,
        model: parameter,
      }));
    case getType(changeParametersOrder):
      return action.payload;
    case getType(resetParameterFormModel):
      return [];
    default:
      return state;
  }
};

export const dialogIsOpen = (state = false, action: RootAction): boolean => {
  switch (action.type) {
    case getType(showDialog):
      return true;
    case getType(hideDialog):
      return false;
    default:
      return state;
  }
};

export const editedParameterName = (
  state: string | null = null,
  action: RootAction
): string | null => {
  switch (action.type) {
    case getType(setEditedParameterName):
      return action.payload;
    case getType(resetEditedParameterName):
      return null;
    default:
      return state;
  }
};

export const highlightEmpty = (state = false, action: RootAction) => {
  switch (action.type) {
    case getType(setHighlightEmpty):
      return true;
    case getType(resetHighlightEmpty):
      return false;
    default:
      return state;
  }
};

export const removedParameterResponse = (
  state: ValidationParameterResponse | null = null,
  action: RootAction
) => {
  switch (action.type) {
    case getType(findParameterValue.request):
      return state;
    case getType(findParameterValue.success):
      return action.payload;
    case getType(findParameterValue.failure):
      return state;
    case getType(resetRemoveParameterResponse):
      return null;
    default:
      return state;
  }
};

export const identifierValidation = (
  state: ValidationParameterResponse | null = null,
  action: RootAction
) => {
  switch (action.type) {
    case getType(findParameterIdentifier.request):
      return state;
    case getType(findParameterIdentifier.success):
      return action.payload;
    case getType(findParameterIdentifier.failure):
      return state;
    default:
      return state;
  }
};

const resourceTypePage = combineReducers({
  formModel,
  parameterRows,
  editedParameterName,
  dialogIsOpen,
  highlightEmpty,
  uniqueName,
  previousModelState,
  removedParameterResponse,
  identifierValidation,
});

export default resourceTypePage;
