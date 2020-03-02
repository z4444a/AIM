import React from 'react';
import { shallow } from 'enzyme';
import { GuestPage, Props } from './guest-page';
import RegistrationPage from '../../../registration/features/registration-page/index';
import LoginPage from '../../../login/features/login-page/index';
import Spinner from '../../../../commons/components/spinner/spinner';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';

describe('GuestPage', () => {
  function generateWrapper(firstUserExists: boolean, checkingExistenceOfFirstUser: boolean) {
    const withTranslationProps = getMockWithTranslationProps();
    const props: Props = {
      classes: {
        container: 'container',
        spinnerContainer: 'spinnerContainer',
      },
      firstUserExists,
      checkingExistenceOfFirstUser,
      checkIsFirstUserExist: () => {},
      ...withTranslationProps,
    };
    return shallow(<GuestPage {...props} />);
  }

  it('should render RegistrationPage', () => {
    const wrapper = generateWrapper(false, false);

    expect(wrapper.find(RegistrationPage).exists()).toBe(true);
  });

  it('should render LoginPage', () => {
    const wrapper = generateWrapper(true, false);

    expect(wrapper.find(LoginPage).exists()).toBe(true);
  });

  it('should render loading spinner', () => {
    const wrapper = generateWrapper(false, true);

    expect(wrapper.find(Spinner).exists()).toBe(true);
  });
});
