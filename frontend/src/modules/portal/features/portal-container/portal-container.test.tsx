import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { PortalContainer, Props } from './portal-container';

describe('PortalContainer', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: Props = {
      classes: {
        content: 'content',
        toolbar: 'toolbar',
        mainContainer: 'mainContainer',
        bodyContainer: 'bodyContainer',
      },
    };
    wrapper = shallow(<PortalContainer {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
