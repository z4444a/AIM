import React from 'react';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText/FormHelperText';
import { InputProps as StandardInputProps } from '@material-ui/core/Input';

export enum FieldType {
  Number = 'Number',
  Date = 'Date',
  List = 'List',
  Text = 'Text',
  Real = 'Real',
  Pool = 'Pool',
}

export interface LabelConfig {
  visible: boolean;
  value: string;
}

export interface ErrorConfig {
  value?: string;
  reason?: string;
}

export interface BaseFieldConfigI {
  fieldType: FieldType;
  key: string;
  showHelperOnError?: boolean;
  required?: boolean;
  disabled?: boolean;
  multipleMax?: number;
  labelConfig?: LabelConfig;
  error?: ErrorConfig;
  className?: string;
  style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: React.Ref<any> | React.RefObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootRef?: React.Ref<any> | React.RefObject<any>;
  FormHelperTextProps?: Partial<FormHelperTextProps>;
}

export abstract class BaseFieldConfigModel implements BaseFieldConfigI {
  public fieldType: FieldType;
  public key: string;
  public required: boolean;
  public disabled?: boolean;
  public showHelperOnError?: boolean = true;
  public fullWidth?: boolean;
  public labelConfig?: LabelConfig;
  public error?: ErrorConfig;
  public className?: string;
  public style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public inputRef?: React.Ref<any> | React.RefObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public rootRef?: React.Ref<any> | React.RefObject<any>;
  public FormHelperTextProps?: Partial<FormHelperTextProps>;
  public InputProps?: Partial<StandardInputProps>;
  public multipleMax?: number;

  protected constructor(fieldType: FieldType, key: string) {
    this.fieldType = fieldType;
    this.key = key;
    this.required = false;
    this.showHelperOnError = true;
    this.multipleMax = 1;
  }
}

export interface FieldHandlers<T> {
  onValueChange: (value: T, key: string) => void;
  onFieldRender?: (param: number) => void;
  onValuesChange?: (values: T[], key: string) => void;
}

export class TextFieldConfigModel extends BaseFieldConfigModel {
  public constraints?: {
    maxStringLength?: number;
    regExp?: string;
  };

  public constructor(key: string) {
    super(FieldType.Text, key);
  }
}

export type TextFieldValue = string;

export interface TextFieldHandlers extends FieldHandlers<TextFieldValue> {}

export class NumberFieldConfigModel extends BaseFieldConfigModel {
  public constraints?: {
    minNumberValue?: number;
    maxNumberValue?: number;
  };

  public constructor(key: string) {
    super(FieldType.Number, key);
  }
}

export type NumberFieldValue = number | undefined;

export interface NumberFieldHandlers extends FieldHandlers<NumberFieldValue> {}

export class RealNumberFieldConfigModel extends BaseFieldConfigModel {
  public constraints?: {
    minNumberValue?: number;
    maxNumberValue?: number;
    precision?: number;
  };

  public constructor(key: string) {
    super(FieldType.Real, key);
  }
}

export class DateFieldConfigModel extends BaseFieldConfigModel {
  public constraints?: {
    minDateValue?: Date;
    minDateToday?: boolean;
    maxDateToday?: boolean;
    maxDateValue?: Date;
  };

  public constructor(key: string) {
    super(FieldType.Date, key);
  }
}

export type DateFieldValue = Date;

export interface DateFieldHandlers extends FieldHandlers<DateFieldValue> {}

export class ListFieldConfigModel extends BaseFieldConfigModel {
  public optionList: { [key: string]: string } = {};
  public typeId?: number;
  public constructor(key: string) {
    super(FieldType.List, key);
  }
}

export type ListFieldValue = string;

export interface ListFieldHandlers extends FieldHandlers<ListFieldValue> {}

export type GenericFieldValue = TextFieldValue | NumberFieldValue | DateFieldValue | ListFieldValue;

export interface GenericFieldHandlers extends FieldHandlers<GenericFieldValue> {}

export interface GenericFormValue {
  [key: string]: GenericFieldValue[];
}

export interface GenericFormHandlers {
  onValueChange: (value: GenericFormValue) => void;
  onFieldRender?: (param: number) => void;
}
