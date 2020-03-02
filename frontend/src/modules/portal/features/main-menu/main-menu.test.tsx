import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { InternalProps, MainMenu, State } from './main-menu';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import sinon from 'sinon';
import { CurrentUser } from '../../../../model/current-user';
import { Role } from '../../../../commons/role';
import { Path } from '../../../../commons/path';

describe('MainMenu', () => {
  function getComponentProps(userRole: Role): InternalProps {
    const user: CurrentUser = {
      id: 0,
      fullName: 'fullName',
      username: 'name',
      role: userRole,
    };
    const withTranslationProps = getMockWithTranslationProps();
    const props: InternalProps = {
      redirect: sinon.spy(),
      user,
      ...withTranslationProps,
    };

    return props;
  }

  function generateShallowWrapper(userRole: Role) {
    const wrapper = shallow(<MainMenu {...getComponentProps(userRole)} />);
    return wrapper;
  }

  function generateMountWrapper(userRole: Role) {
    const wrapper = mount(<MainMenu {...getComponentProps(userRole)} />);
    return wrapper;
  }

  it('should render correctly', () => {
    const wrapper = generateShallowWrapper(Role.ADMIN);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should redirect to requests page', () => {
    const wrapper = generateMountWrapper(Role.ADMIN);
    const menuItems = (wrapper.state() as State).menuItems;
    const item = menuItems.find(item => item.path === Path.REQUESTS);
    const listItem = wrapper.find(`#${item.key}`).at(0);
    listItem.simulate('click');
    expect(wrapper.props().redirect.calledOnceWith(Path.REQUESTS)).toBe(true);
  });

  it('should redirect to resource types page', () => {
    const wrapper = generateMountWrapper(Role.ADMIN);
    const menuItems = (wrapper.state() as State).menuItems;
    const item = menuItems.find(item => item.path === Path.RESOURCE_TYPES);
    const listItem = wrapper.find(`#${item.key}`).at(0);
    listItem.simulate('click');
    expect(wrapper.props().redirect.calledOnceWith(Path.RESOURCE_TYPES)).toBe(true);
  });

  it('should redirect to resource pools page', () => {
    const wrapper = generateMountWrapper(Role.ADMIN);
    const menuItems = (wrapper.state() as State).menuItems;
    const item = menuItems.find(item => item.path === Path.RESOURCE_POOLS);
    const listItem = wrapper.find(`#${item.key}`).at(0);
    listItem.simulate('click');
    expect(wrapper.props().redirect.calledOnceWith(Path.RESOURCE_POOLS)).toBe(true);
  });

  it('should redirect to employees page', () => {
    const wrapper = generateMountWrapper(Role.ADMIN);
    const menuItems = (wrapper.state() as State).menuItems;
    const item = menuItems.find(item => item.path === Path.EMPLOYEES);
    const listItem = wrapper.find(`#${item.key}`).at(0);
    listItem.simulate('click');
    expect(wrapper.props().redirect.calledOnceWith(Path.EMPLOYEES)).toBe(true);
  });

  it('employees item should not be visible to Role.USER', () => {
    const wrapper = generateMountWrapper(Role.USER);
    const menuItems = (wrapper.state() as State).menuItems;
    const item = menuItems.find(item => item.path === Path.EMPLOYEES);
    const actual = wrapper.exists(`#${item.key}`);
    expect(actual).toBe(false);
  });
});
