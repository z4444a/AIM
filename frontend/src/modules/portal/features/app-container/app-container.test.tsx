import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { AppContainer, Props } from './app-container';

describe('AppContainer', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: Props = {
      classes: {
        root: 'root',
        enqueueSnackbar: () => {},
        loseSnackbar: () => {},
      },
    };
    wrapper = shallow(<AppContainer {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
