import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { FormData, InternalProps, RegistrationForm } from './registration-form';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';

describe('RegistrationForm', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const data: FormData = {
      login: '',
      pwd: '',
      confirmPwd: '',
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
      value: data,
      showPwd: false,
      showPwdConfirm: false,
      classes,
      ...withTranslationProps,
    };
    wrapper = shallow(<RegistrationForm {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
