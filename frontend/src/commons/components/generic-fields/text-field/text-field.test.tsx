import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { TextFieldConfigModel, TextFieldHandlers } from '../models/field-config.model';
import { InternalProps, TextField } from './text-field';

describe('TextField', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const fieldConfig = new TextFieldConfigModel('textField');
    const handlers: TextFieldHandlers = {
      onValueChange: () => {},
    };

    const props: InternalProps = {
      fieldConfig,
      handlers,
    };
    wrapper = shallow(<TextField {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
