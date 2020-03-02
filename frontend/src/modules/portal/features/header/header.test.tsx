import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { Header, Props } from './header';
import sinon from 'sinon';

describe('AppHeader', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: Props = {
      classes: {
        appBar: 'appBar',
        toolbar: 'toolbar',
        menuButton: 'menuButton',
        emptySpace: 'emptySpace',
      },
      name: 'userName',
      toggleSideNav: sinon.spy(),
      logout: sinon.spy(),
    };
    wrapper = shallow(<Header {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
