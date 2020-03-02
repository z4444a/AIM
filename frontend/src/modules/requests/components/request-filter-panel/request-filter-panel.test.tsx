import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import { InternalProps, RequestFilterPanel } from './request-filter-panel';

describe('RequestFilterPanel', () => {
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
    return shallow(<RequestFilterPanel {...getComponentProps()} />);
  }

  it('should render correctly', () => {
    const wrapper = generateShallowWrapper();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
