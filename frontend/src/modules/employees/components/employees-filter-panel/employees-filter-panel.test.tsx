import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { EmployeesFilterPanel, InternalProps } from './employees-filter-panel';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';

describe('EmployeesFilterPanel', () => {
  function getComponentProps(): InternalProps {
    const withTranslation = getMockWithTranslationProps();
    const props: InternalProps = {
      classes: {
        container: 'container',
      },
      ...withTranslation,
      context: {
        values: {},
        changeFilters: () => {},
        applyFilters: () => {},
      },
    };
    return props;
  }

  function generateShallowWrapper() {
    return shallow(<EmployeesFilterPanel {...getComponentProps()} />);
  }

  it('should render correctly', () => {
    const wrapper = generateShallowWrapper();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
