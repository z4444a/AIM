import { createAction, createAsyncAction } from 'typesafe-actions';
import { TypeFormModel } from '../../model/form/type-form-model';
import { ParameterFormModel } from '../../model/form/parameter-form-model';
import { ParameterModifier } from '../../model/parameter-modifier';
import { ParameterRowFormModel } from '../../model/form/parameter-row-form-model';
import { ValidationParameterResponse } from '../../model/validation-parameter-response';
import { ParameterUniqueFields } from '../../model/parameters/parameter-unique-fields';

export const updateFormModel = createAction('RESOURCE_TYPE_PAGE/UPDATE_FORM_MODEL', action => {
  return (data: TypeFormModel) => action(data);
});

export const resetFormModel = createAction('RESOURCE_TYPE_PAGE/RESET_FORM_MODEL');

export const checkUniqueTypeName = createAction(
  'RESOURCE_TYPE_PAGE/CHECK_UNIQUE_TYPE_NAME',
  action => {
    return (data: boolean) => action(data);
  }
);

export const resetCheckUniqueTypeName = createAction(
  'RESOURCE_TYPE_PAGE/RESET_CHECK_UNIQUE_TYPE_NAME'
);

export const setParameterFormModels = createAction(
  'RESOURCE_TYPE_PAGE/SET_PARAMETER_FORM_MODELS',
  action => {
    return (data: ParameterFormModel[]) => action(data);
  }
);

export const changeParametersOrder = createAction(
  'RESOURCE_TYPE_PAGE/CHANGE_PARAMETERS_ORDER',
  action => {
    return (data: ParameterRowFormModel[]) => action(data);
  }
);

export const updateParameterFormModel = createAction(
  'RESOURCE_TYPE_PAGE/UPDATE_PARAMETER_FORM_MODEL',
  action => {
    return (data: { key: number; model: ParameterFormModel }) => action(data);
  }
);

export const removeParameterRow = createAction(
  'RESOURCE_TYPE_PAGE/REMOVE_PARAMETER_FORM_MODEL',
  action => {
    return (data: number) => action(data);
  }
);

export const setEditable = createAction('RESOURCE_TYPE_PAGE/SET_EXPANDED', action => {
  return (data: { key: number; editable: boolean }) => action(data);
});

export const addParameterRow = createAction('RESOURCE_TYPE_PAGE/ADD_PARAMETER_ROW', action => {
  return (data: ParameterModifier) => action(data);
});

export const resetParameterFormModel = createAction(
  'RESOURCE_TYPE_PAGE/RESET_PARAMETER_FORM_MODEL'
);

export const showDialog = createAction('RESOURCE_TYPE_PAGE/SHOW_DIALOG');

export const hideDialog = createAction('RESOURCE_TYPE_PAGE/CLOSE_DIALOG');

export const setEditedParameterName = createAction(
  'RESOURCE_TYPE_PAGE/SET_EDITED_PARAMETER',
  action => {
    return (data: string) => action(data);
  }
);

export const resetEditedParameterName = createAction(
  'RESOURCE_TYPE_PAGE/RESET_EDITED_PARAMETER_NAME'
);

export const setHighlightEmpty = createAction('RESOURCE_TYPE_PAGE/SET_HIGHLIGHT_EMPTY');

export const resetHighlightEmpty = createAction('RESOURCE_TYPE_PAGE/RESET_HIGHLIGHT_EMPTY');

export const findParameterValue = createAsyncAction(
  'RESOURCE_TYPE_PAGE/FIND_PARAMETER_VALUE_REQUEST',
  'RESOURCE_TYPE_PAGE/FIND_PARAMETER_VALUE_SUCCESS',
  'RESOURCE_TYPE_PAGE/FIND_PARAMETER_VALUE_FAILURE'
)<number, ValidationParameterResponse, Error>();

export const findParameterIdentifier = createAsyncAction(
  'RESOURCE_TYPE_PAGE/FIND_PARAMETER_MODIFIER_REQUEST',
  'RESOURCE_TYPE_PAGE/fIND_PARAMETER_MODIFIER_SUCCESS',
  'RESOURCE_TYPE_PAGE/FIND_PARAMETER_MODIFIER_FAILURE'
)<ParameterUniqueFields, ValidationParameterResponse | null, Error>();

export const resetRemoveParameterResponse = createAction(
  'RESOURCE_TYPE_PAGE/RESET_REMOVE_PARAMETER_RESPONSE'
);
