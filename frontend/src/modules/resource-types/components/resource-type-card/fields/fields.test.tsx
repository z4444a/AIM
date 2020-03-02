import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { InternalProps, TypeFields } from './fields';
import { getMockWithTranslationProps } from '../../../../../test-utils/with-translation-props-mock';

describe('ResourceTypeFields', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: InternalProps = {
      ...getMockWithTranslationProps(),
      classes: {
        avatar: 'avatar',
        imgContainer: 'imgContainer',
        mainContainer: 'mainContainer',
      },
      active: false,
      backup: false,
      description: '',
      highlightEmpty: false,
      imgSource: '',
      name: '',
      onActiveChange: (e, checked) => null,
      onBackupChange: (event, checked) => null,
      onDescriptionChange: event1 => null,
      onImgSourceChange: event1 => null,
      onNameChange: event1 => null,
    };
    wrapper = shallow(<TypeFields {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
