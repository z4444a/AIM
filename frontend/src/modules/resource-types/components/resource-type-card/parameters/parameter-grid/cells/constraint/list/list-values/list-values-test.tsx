import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { InternalProps, ListValues } from './list-values';
import { getMockWithTranslationProps } from '../../../../../../../../../../test-utils/with-translation-props-mock';

describe('ListValuesForm', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: InternalProps = {
      ...getMockWithTranslationProps(),
      classes: {
        root: 'root',
      },
      onRemove: () => {},
      onContentChange: () => {},
      changeOrder: () => {},
    };
    wrapper = shallow(<ListValues {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
