import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { InternalProps, SideBar } from './side-bar';

describe('SideBar', () => {
  let wrapper: ShallowWrapper;
  const props: InternalProps = {
    classes: {
      drawer: 'drawer',
      drawerOpen: 'drawerOpen',
      drawerClose: 'drawerClose',
      drawerPaper: 'drawerPaper',
      toolbar: 'toolbar',
      link: 'link',
    },
    sideNavIsOpen: true,
  };
  beforeEach(() => {
    wrapper = shallow(<SideBar {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
