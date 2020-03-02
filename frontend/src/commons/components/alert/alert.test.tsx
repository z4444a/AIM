import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { Alert, AlertType, InternalProps } from './alert';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import Info from '@material-ui/icons/Info';
import Warning from '@material-ui/icons/Warning';

describe('Alert', () => {
  function getComponentProps(type: AlertType): InternalProps {
    const props: InternalProps = {
      classes: {
        container: 'container',
        error: 'error',
        icon: 'icon',
        iconVariant: 'iconVariant',
        info: 'info',
        message: 'message',
        success: 'success',
        warning: 'warning',
      },
      message: 'Message',
      type,
    };
    return props;
  }

  function generateShallowWrapper(type: AlertType) {
    return shallow(<Alert {...getComponentProps(type)} />);
  }

  function generateMountWrapper(type: AlertType) {
    return mount(<Alert {...getComponentProps(type)} />);
  }

  it('should render correctly', () => {
    const wrapper = generateShallowWrapper('info');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render error icon', () => {
    const wrapper = generateMountWrapper('error');
    expect(wrapper.find(Error).exists()).toBe(true);
  });

  it('should render info icon', () => {
    const wrapper = generateMountWrapper('info');
    expect(wrapper.find(Info).exists()).toBe(true);
  });

  it('should render success icon', () => {
    const wrapper = generateMountWrapper('success');
    expect(wrapper.find(CheckCircle).exists()).toBe(true);
  });

  it('should render warning icon', () => {
    const wrapper = generateMountWrapper('warning');
    expect(wrapper.find(Warning).exists()).toBe(true);
  });
});
