import {
  BaseFieldConfigI,
  DateFieldConfigModel,
  ListFieldConfigModel,
  NumberFieldConfigModel,
  RealNumberFieldConfigModel,
  TextFieldConfigModel,
} from '../components/generic-fields/models/field-config.model';
import FullParameterModel, { ParameterType } from '../../model/get/full-parameter-model';

export class GenericFieldConverterService {
  public getResourceParametersGenericFormConfig(
    resourceTypeParameters?: FullParameterModel[]
  ): BaseFieldConfigI[] | null {
    if (!resourceTypeParameters || resourceTypeParameters.length === 0) {
      return null;
    }
    return resourceTypeParameters
      .map(parameter => {
        let config: BaseFieldConfigI | null = null;
        switch (parameter.parameterType) {
          case ParameterType.DATE:
            config = this.getDateFieldConfig(parameter);
            break;
          case ParameterType.POOL:
          case ParameterType.LIST:
            config = this.getListFieldConfig(parameter);
            break;
          case ParameterType.TEXT:
            config = this.getTextFieldConfig(parameter);
            break;
          case ParameterType.NUMBER:
            config = this.getNumberFieldConfig(parameter);
            break;
          case ParameterType.REAL:
            config = this.getRealNumberFieldConfig(parameter);
            break;
        }

        return config;
      })
      .filter(config => !!config) as BaseFieldConfigI[];
  }

  private getNumberFieldConfig(parameter: FullParameterModel): BaseFieldConfigI {
    const config = new NumberFieldConfigModel(parameter.id.toString());
    if (parameter.constraint) {
      config.constraints = {};
      if (parameter.constraint.minNumberValue != null) {
        config.constraints.minNumberValue = parameter.constraint.minNumberValue;
      }
      if (parameter.constraint.maxNumberValue != null) {
        config.constraints.maxNumberValue = parameter.constraint.maxNumberValue;
      }
    }
    return this.fillBaseConfigFields(config, parameter);
  }

  private getRealNumberFieldConfig(parameter: FullParameterModel): BaseFieldConfigI {
    const config = new RealNumberFieldConfigModel(parameter.id.toString());

    config.constraints = {};

    if (parameter.constraint) {
      if (parameter.constraint.minRealValue != null) {
        config.constraints.minNumberValue = parameter.constraint.minRealValue;
      }
      if (parameter.constraint.maxRealValue != null) {
        config.constraints.maxNumberValue = parameter.constraint.maxRealValue;
      }
    }

    config.constraints.precision = 2;

    return this.fillBaseConfigFields(config, parameter);
  }

  private getTextFieldConfig(parameter: FullParameterModel): BaseFieldConfigI {
    const config = new TextFieldConfigModel(parameter.id.toString());
    if (parameter.constraint) {
      config.constraints = {};
      if (parameter.constraint.maxStringLength != null) {
        config.constraints.maxStringLength = parameter.constraint.maxStringLength;
      }
      if (parameter.constraint.regExp != null) {
        config.constraints.regExp = parameter.constraint.regExp;
      }
    }
    return this.fillBaseConfigFields(config, parameter);
  }

  private getDateFieldConfig(parameter: FullParameterModel): BaseFieldConfigI {
    const config = new DateFieldConfigModel(parameter.id.toString());
    if (parameter.constraint) {
      config.constraints = {};
      if (parameter.constraint.minDateValue != null) {
        config.constraints.minDateValue = parameter.constraint.minDateValue;
      }
      if (parameter.constraint.maxDateValue != null) {
        config.constraints.maxDateValue = parameter.constraint.maxDateValue;
      }
      if (parameter.constraint.minDateToday) {
        config.constraints.minDateValue = new Date();
      }
      if (parameter.constraint.maxDateToday) {
        config.constraints.maxDateValue = new Date();
      }
    }
    return this.fillBaseConfigFields(config, parameter);
  }

  private getListFieldConfig(parameter: FullParameterModel): BaseFieldConfigI {
    const config = new ListFieldConfigModel(parameter.id.toString());
    if (
      parameter.constraint &&
      parameter.constraint.listValues &&
      parameter.constraint.listValues.length !== 0
    ) {
      (config as ListFieldConfigModel).optionList = {};
      parameter.constraint.listValues.forEach(optionItem => {
        (config as ListFieldConfigModel).optionList[optionItem.id] = optionItem.content;
      });
    }
    (config as ListFieldConfigModel).typeId = parameter.poolTypeId;
    return this.fillBaseConfigFields(config, parameter);
  }

  private fillBaseConfigFields(
    config: BaseFieldConfigI,
    parameter: FullParameterModel
  ): BaseFieldConfigI {
    config.required = parameter.required;
    if (parameter.constraint) {
      config.multipleMax = parameter.constraint.multipleMax;
    }
    config.labelConfig = {
      visible: true,
      value: parameter.name ? parameter.name : '',
    };
    config.style = {
      width: '100%',
    };
    return config;
  }
}

const genericFieldConverterService = new GenericFieldConverterService();
export default genericFieldConverterService;
