import {
  BaseFieldConfigI,
  DateFieldConfigModel,
  DateFieldValue,
  ErrorConfig,
  FieldType,
  GenericFieldValue,
  ListFieldValue,
  NumberFieldConfigModel,
  NumberFieldValue,
  RealNumberFieldConfigModel,
  TextFieldConfigModel,
  TextFieldValue,
} from '../components/generic-fields/models/field-config.model';
import { WithTranslation } from 'react-i18next';
import moment from 'moment';

export class ParameterConstraintsService {
  private i18n: WithTranslation | null = null;

  public setI18n(i18n: WithTranslation) {
    this.i18n = i18n;
  }

  public checkConstraints(
    parameterConfigList: BaseFieldConfigI[],
    value: { [key: string]: GenericFieldValue },
    i18n: WithTranslation
  ): { [key: string]: ErrorConfig } | null {
    this.i18n = i18n;
    const errorModel: { [key: string]: ErrorConfig } = {};
    parameterConfigList.forEach(paramConfig => {
      const fieldValue = value ? value[paramConfig.key] : null;
      const constraint = this.checkFieldConstraints(paramConfig, fieldValue);
      if (constraint) {
        errorModel[paramConfig.key] = constraint;
      }
    });
    return Object.keys(errorModel).length === 0 ? null : errorModel;
  }

  public checkMultipleConstraints(
    parameterConfigList: BaseFieldConfigI[],
    values: { [key: string]: GenericFieldValue[] },
    i18n: WithTranslation
  ): { [key: string]: ErrorConfig } | null {
    this.i18n = i18n;
    const errorModel: { [key: string]: ErrorConfig } = {};
    parameterConfigList.forEach(paramConfig => {
      const fieldValues = values ? values[paramConfig.key] : [];
      if (!fieldValues) {
        return null;
      }
      fieldValues.forEach(value => {
        const constraint = this.checkFieldConstraints(paramConfig, value);
        if (constraint) {
          errorModel[paramConfig.key] = constraint;
        }
      });
    });
    return Object.keys(errorModel).length === 0 ? null : errorModel;
  }

  private checkFieldConstraints(
    paramConfig: BaseFieldConfigI,
    paramValue: GenericFieldValue | null
  ): ErrorConfig | null {
    if (!paramConfig || !paramConfig.fieldType) {
      return null;
    }
    switch (paramConfig.fieldType) {
      case FieldType.Text:
        return this.checkTextConstraints(paramConfig as TextFieldConfigModel, paramValue);
      case FieldType.Date:
        return this.checkDateConstraints(paramConfig as DateFieldConfigModel, paramValue);
      case FieldType.List:
        return this.checkListConstraints(paramConfig, paramValue);
      case FieldType.Number:
        return this.checkNumberConstraints(paramConfig as NumberFieldConfigModel, paramValue);
      case FieldType.Real:
        return this.checkRealNumberConstraints(
          paramConfig as RealNumberFieldConfigModel,
          paramValue
        );
    }
    return null;
  }

  private getI18nT(): WithTranslation {
    if (!this.i18n) {
      throw new Error('cannot get i18n object');
    }

    return this.i18n;
  }

  public checkListConstraints(
    paramConfig: BaseFieldConfigI,
    paramValue: GenericFieldValue | null
  ): ErrorConfig | null {
    if (!paramConfig) {
      return null;
    }
    const listParamValue = paramValue as ListFieldValue;
    if (paramConfig.required && (!listParamValue || listParamValue.length === 0)) {
      return this.getRequiredErrorModel();
    }

    return null;
  }

  public checkTextConstraints(
    paramConfig: TextFieldConfigModel,
    paramValue: GenericFieldValue | null
  ): ErrorConfig | null {
    if (!paramConfig) {
      return null;
    }
    const textParamValue = paramValue as TextFieldValue;
    if (!textParamValue) {
      return paramConfig.required ? this.getRequiredErrorModel() : null;
    }
    if (!paramConfig.constraints) {
      return null;
    }
    if (paramConfig.constraints.maxStringLength != null) {
      const value = textParamValue || '';
      const maxLen = paramConfig.constraints.maxStringLength;
      if (value.length > maxLen) {
        return this.getMaxStringLenErrorModel(maxLen, textParamValue);
      }
    }
    if (paramConfig.constraints.regExp != null) {
      try {
        const value = textParamValue || '';
        const regex = new RegExp(paramConfig.constraints.regExp);
        const match = value.match(regex);
        if (match === null || !match.some(p => p.length === value.length)) {
          return this.getRegExpErrorModel(paramConfig.constraints.regExp, textParamValue);
        }
      } catch (error) {}
    }
    return null;
  }

  public checkNumberConstraints(
    paramConfig: NumberFieldConfigModel,
    paramValue: GenericFieldValue | null
  ): ErrorConfig | null {
    if (!paramConfig) {
      return null;
    }
    const numberParamValue = paramValue as NumberFieldValue;
    if (numberParamValue == null) {
      return paramConfig.required ? this.getRequiredErrorModel() : null;
    }

    if (paramConfig.constraints) {
      if (paramConfig.constraints.minNumberValue != null) {
        const minValue = paramConfig.constraints.minNumberValue;
        if (numberParamValue < minValue) {
          return this.getMinValueErrorModel(minValue, paramValue as string);
        }
      }
      if (paramConfig.constraints.maxNumberValue != null) {
        const maxValue = paramConfig.constraints.maxNumberValue;
        if (numberParamValue > maxValue) {
          return this.getMaxValueErrorModel(maxValue, paramValue as string);
        }
      }
    }
    return null;
  }

  public checkDateConstraints(
    paramConfig: DateFieldConfigModel,
    paramValue: GenericFieldValue | null
  ): ErrorConfig | null {
    if (!paramConfig) {
      return null;
    }
    const dateParamValue = paramValue as DateFieldValue;
    if (dateParamValue == null) {
      return paramConfig.required ? this.getRequiredErrorModel() : null;
    }

    if (paramConfig.constraints) {
      if (paramConfig.constraints.minDateValue != null) {
        const minValue = paramConfig.constraints.minDateValue;
        if (moment(dateParamValue).isBefore(minValue)) {
          return this.getMinDateErrorModel(minValue, paramValue as string);
        }
      }
      if (paramConfig.constraints.maxDateValue != null) {
        const maxValue = paramConfig.constraints.maxDateValue;
        if (moment(dateParamValue).isAfter(maxValue)) {
          return this.getMaxDateErrorModel(maxValue, paramValue as string);
        }
      }
    }
    return null;
  }

  public checkRealNumberConstraints(
    paramConfig: RealNumberFieldConfigModel,
    paramValue: GenericFieldValue | null
  ): ErrorConfig | null {
    if (!paramConfig) {
      return null;
    }
    const numberParamValue = paramValue as NumberFieldValue;
    if (numberParamValue == null) {
      return paramConfig.required ? this.getRequiredErrorModel() : null;
    }
    if (paramConfig.constraints) {
      if (paramConfig.constraints.minNumberValue != null) {
        const minValue = paramConfig.constraints.minNumberValue;
        if (numberParamValue < minValue) {
          return this.getMinValueErrorModel(minValue, paramValue as string);
        }
      }
      if (paramConfig.constraints.maxNumberValue != null) {
        const maxValue = paramConfig.constraints.maxNumberValue;
        if (numberParamValue > maxValue) {
          return this.getMaxValueErrorModel(maxValue, paramValue as string);
        }
      }
    }
    return null;
  }

  private getRequiredErrorModel(): ErrorConfig {
    const { t } = this.getI18nT();
    return {
      value: t('constraints.requiredField'),
    };
  }

  private getMaxStringLenErrorModel(maxLen: number, reason?: string): ErrorConfig {
    const { t } = this.getI18nT();
    return {
      value: t('constraints.maxLength', { max: maxLen }),
      reason,
    };
  }

  private getRegExpErrorModel(regex: string, reason?: string): ErrorConfig {
    const { t } = this.getI18nT();
    return {
      value: t('constraints.regExp', { regExp: regex }),
      reason,
    };
  }

  private getMinValueErrorModel(minValue: number, reason?: string): ErrorConfig {
    const { t } = this.getI18nT();
    return {
      value: t('constraints.minNumberValue', { min: minValue }),
      reason,
    };
  }

  private getMaxValueErrorModel(maxValue: number, reason?: string): ErrorConfig {
    const { t } = this.getI18nT();
    return {
      value: t('constraints.maxNumberValue', { max: maxValue }),
      reason,
    };
  }

  private getMinDateErrorModel(minValue: Date, reason?: string): ErrorConfig {
    const { t } = this.getI18nT();
    return {
      value: t('constraints.minDateValue', { min: moment(minValue).format('YYYY-MM-DD') }),
      reason,
    };
  }

  private getMaxDateErrorModel(maxValue: Date, reason?: string): ErrorConfig {
    const { t } = this.getI18nT();
    return {
      value: t('constraints.maxDateValue', { max: moment(maxValue).format('YYYY-MM-DD') }),
      reason,
    };
  }
}

const parameterConstraintsService = new ParameterConstraintsService();
export default parameterConstraintsService;
