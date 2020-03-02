import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import {
  BaseFieldConfigI,
  DateFieldConfigModel,
  FieldType,
  GenericFieldHandlers,
  ListFieldConfigModel,
  NumberFieldConfigModel,
  RealNumberFieldConfigModel,
  TextFieldConfigModel,
} from '../models/field-config.model';
import { GenericField, InternalProps } from './generic-field';
import TextField from '../text-field/index';
import NumberField from '../number-field/index';
import { DateField } from '../date-field/date-field';
import { ListField } from '../list-field/list-field';
import RealNumberField from '../real-number-field/index';

describe('GenericField', () => {
  function getComponentProps(fieldType: FieldType): InternalProps {
    const handlers: GenericFieldHandlers = {
      onValueChange: () => {},
    };
    let fieldConfig: BaseFieldConfigI = new TextFieldConfigModel('key');
    switch (fieldType) {
      case FieldType.Date:
        fieldConfig = new DateFieldConfigModel('key');
        break;
      case FieldType.List:
        fieldConfig = new ListFieldConfigModel('key');
        break;
      case FieldType.Number:
        fieldConfig = new NumberFieldConfigModel('key');
        break;
      case FieldType.Text:
        fieldConfig = new TextFieldConfigModel('key');
        break;
      case FieldType.Real:
        fieldConfig = new RealNumberFieldConfigModel('key');
    }
    const value = [undefined];
    const props: InternalProps = {
      classes: {
        container: 'container',
      },
      value,
      handlers,
      fieldConfig,
    };

    return props;
  }

  function getShallowWrapper(fieldType: FieldType) {
    const wrapper = shallow(<GenericField {...getComponentProps(fieldType)} />);
    return wrapper;
  }

  it('should render correctly', () => {
    const wrapper = getShallowWrapper(FieldType.Text);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField', () => {
    const wrapper = getShallowWrapper(FieldType.Text);
    expect(wrapper.find(TextField).exists()).toBe(true);
  });

  it('should render NumberField', () => {
    const wrapper = getShallowWrapper(FieldType.Number);
    expect(wrapper.find(NumberField).exists()).toBe(true);
  });

  it('should render DateField', () => {
    const wrapper = getShallowWrapper(FieldType.Date);
    expect(wrapper.find(DateField).exists()).toBe(true);
  });

  it('should render ListField', () => {
    const wrapper = getShallowWrapper(FieldType.List);
    expect(wrapper.find(ListField).exists()).toBe(true);
  });

  it('should render RealNumberField', () => {
    const wrapper = getShallowWrapper(FieldType.Real);
    expect(wrapper.find(RealNumberField).exists()).toBe(true);
  });
});
