import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { FormData, InternalProps, LoginForm } from './login-form';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';

describe('LoginForm', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const data: FormData = {
      login: '',
      pwd: '',
    };
    const classes = {
      container: 'container',
      paper: 'paper',
      avatar: 'avatar',
      form: 'form',
      submit: 'submit',
      card: 'card',
      greeting: 'greeting',
    };
    const withTranslationProps = getMockWithTranslationProps();
    const props: InternalProps = {
      classes,
      value: data,
      showPwd: false,
      showInvalidAuth: false,
      ...withTranslationProps,
    };
    wrapper = shallow(<LoginForm {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
