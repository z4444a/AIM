import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ListFieldConfigModel, ListFieldHandlers } from '../models/field-config.model';
import { InternalProps, ListField } from './list-field';

describe('ListField', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const fieldConfig = new ListFieldConfigModel('listField');
    fieldConfig.optionList = {
      firstOption: 'FirstOption',
      secondOption: 'SecondOption',
    };
    const handlers: ListFieldHandlers = {
      onValueChange: () => {},
    };

    const props: InternalProps = {
      fieldConfig,
      handlers,
    };
    wrapper = shallow(<ListField {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
