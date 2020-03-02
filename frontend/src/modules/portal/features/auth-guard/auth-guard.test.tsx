import { shallow } from 'enzyme';
import React from 'react';
import { AuthGuard, Props } from './auth-guard';
import { Redirect } from 'react-router';
import { getMockRouterProps } from '../../../../test-utils/route-component-props-mock';

describe('AuthGuard', () => {
  function generateWrapper(isAuthenticated: boolean) {
    const childComponent = <div id="childComponent">child component</div>;
    const routerProps = getMockRouterProps(null);
    routerProps.history.location.pathname = 'pathname';
    const props: Props = {
      isAuthenticated,
      children: childComponent,
      ...routerProps,
    };
    return shallow(<AuthGuard {...props} />);
  }

  it('should render children', () => {
    const wrapper = generateWrapper(true);
    expect(wrapper.find('#childComponent').exists()).toBe(true);
  });

  it('should render LoginPage', () => {
    const wrapper = generateWrapper(false);

    expect(wrapper.find(Redirect).exists()).toBe(true);
  });
});
