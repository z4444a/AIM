import { ParameterValueFormModel } from '../../model/form/parameter-value-form-model';
import {
  DateFieldValue,
  GenericFieldValue,
  GenericFormValue,
  NumberFieldValue,
  TextFieldValue,
} from '../components/generic-fields/models/field-config.model';
import FullParameterModel from '../../model/get/full-parameter-model';
import { ParameterType } from '../../model/parameter-type';

export class ParameterValueMapper {
  public static mapToGenericFormValue = (values: ParameterValueFormModel[]): GenericFormValue => {
    const genericFormValue: GenericFormValue = {};
    values.forEach(value => {
      const { stringValue, numberValue, dateValue, realValue, listValue, parameterPool } = value;
      if (!genericFormValue[value.parameterId.toString()]) {
        genericFormValue[value.parameterId.toString()] = [];
      }
      if (stringValue !== null && stringValue !== undefined) {
        genericFormValue[value.parameterId.toString()][value.order] = stringValue;
        return;
      }
      if (numberValue !== null && numberValue !== undefined) {
        genericFormValue[value.parameterId.toString()][value.order] = numberValue;
        return;
      }
      if (dateValue !== null && dateValue !== undefined) {
        genericFormValue[value.parameterId.toString()].splice(value.order, 0, dateValue);
        return;
      }
      if (realValue !== null && realValue !== undefined) {
        genericFormValue[value.parameterId.toString()].splice(value.order, 0, realValue);
        return;
      }
      if (listValue !== null && listValue !== undefined) {
        genericFormValue[value.parameterId.toString()].splice(
          value.order,
          0,
          listValue.id.toString()
        );
      }
      if (parameterPool && !!parameterPool) {
        genericFormValue[value.parameterId.toString()][value.order] = parameterPool.id;
      }
    });
    return genericFormValue;
  };
  /**
   * Transforms GenericFromValue to FullParameterValue list.
   * @param value contains input values of parameters.
   * @param resourceTypeParameters is an array of type parameters.
   * @param parametersValues are previous values of type parameters.
   */
  public static mapToParameterValues = (
    value: GenericFormValue,
    resourceTypeParameters: FullParameterModel[],
    parametersValues: ParameterValueFormModel[]
  ) => {
    if (!value) {
      return parametersValues;
    }
    const resultValues: ParameterValueFormModel[] = [];
    if (resourceTypeParameters && resourceTypeParameters.length !== 0) {
      resourceTypeParameters.forEach((param: FullParameterModel) => {
        const parameterValues: GenericFieldValue[] = value[param.id];
        if (parameterValues) {
          parameterValues.forEach((paramValue, index) => {
            let prevValue: ParameterValueFormModel = {
              parameterId: param.id,
              order: index,
            };

            if (parametersValues) {
              prevValue =
                parametersValues.find(
                  value => value.parameterId === param.id && index === value.order
                ) || prevValue;
            }
            const {
              dateValue,
              listValue,
              numberValue,
              realValue,
              stringValue,
              parameterPool,
              ...rest
            } = prevValue;
            const paramValueModel: ParameterValueFormModel = {
              ...rest,
            };
            switch (param.parameterType) {
              case ParameterType.NUMBER:
                paramValueModel.numberValue = paramValue as NumberFieldValue;
                break;
              case ParameterType.LIST:
                paramValueModel.listValue = {
                  id: Number(paramValue),
                };
                break;
              case ParameterType.TEXT:
                paramValueModel.stringValue = paramValue as TextFieldValue;
                break;
              case ParameterType.DATE:
                paramValueModel.dateValue = paramValue as DateFieldValue;
                break;
              case ParameterType.REAL:
                paramValueModel.realValue = paramValue as NumberFieldValue;
                break;
              case ParameterType.POOL:
                if (!paramValue && paramValue !== 0) {
                  break;
                }
                const id = +paramValue;
                paramValueModel.parameterPool = {
                  id,
                  name: '',
                };
                break;
            }

            resultValues.push(paramValueModel);
          });
        }
      });
    }
    return resultValues;
  };
}
