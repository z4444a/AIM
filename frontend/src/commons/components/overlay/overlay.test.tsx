import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { InternalProps, Overlay } from './overlay';

describe('Overlay', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: InternalProps = {
      classes: {
        container: 'container',
        innerContainer: 'innerContainer',
      },
      active: true,
      text: 'Overlay works!!!',
    };
    wrapper = shallow(<Overlay {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
