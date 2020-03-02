import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { DateField, InternalProps } from './date-field';
import { DateFieldConfigModel, DateFieldHandlers } from '../models/field-config.model';

describe('DateField', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const fieldConfig = new DateFieldConfigModel('dateField');
    const handlers: DateFieldHandlers = {
      onValueChange: () => {},
    };

    const props: InternalProps = {
      fieldConfig,
      handlers,
    };
    wrapper = shallow(<DateField {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
