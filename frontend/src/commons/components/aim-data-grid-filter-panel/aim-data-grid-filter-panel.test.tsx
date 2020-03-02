import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { AimDataGridFilterPanel, InternalProps } from './aim-data-grid-filter-panel';
import { getMockWithTranslationProps } from '../../../test-utils/with-translation-props-mock';
import sinon from 'sinon';

describe('AimDataGridFilterPanel', () => {
  function getComponentProps(open: boolean): InternalProps {
    const withTranslationProps = getMockWithTranslationProps();
    const props: InternalProps = {
      classes: {
        container: 'container',
      },
      ...withTranslationProps,
      open,
      renderCustomFilterCmp: () => <div id="innerComponent" />,
      onApplyFilters: sinon.spy(),
      onClearFilters: sinon.spy(),
    };
    return props;
  }

  function generateShallowWrapper(open: boolean) {
    return shallow(<AimDataGridFilterPanel {...getComponentProps(open)} />);
  }

  function generateMountWrapper(open: boolean) {
    return mount(<AimDataGridFilterPanel {...getComponentProps(open)} />);
  }

  it('should render correctly', () => {
    const wrapper = generateShallowWrapper(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render internal filter component correctly', () => {
    const wrapper = generateShallowWrapper(true);
    expect(wrapper.find('#innerComponent').exists()).toBe(true);
  });

  it('should not render internal filter component', () => {
    const wrapper = generateShallowWrapper(false);
    expect(wrapper.find('#innerComponent').exists()).toBe(false);
  });

  it('should call clear filter fn', () => {
    const wrapper = generateMountWrapper(true);
    const clearFilterBtn = wrapper.find('#dataGridFilterPanelClearFiltersBtn').first();
    clearFilterBtn.simulate('click');
    expect(wrapper.props().onClearFilters.calledOnce).toBe(true);
  });

  it('should call apply filter fn', () => {
    const wrapper = generateMountWrapper(true);
    const clearFilterBtn = wrapper.find('#dataGridFilterPanelApplyFiltersBtn').first();
    clearFilterBtn.simulate('click');
    expect(wrapper.props().onApplyFilters.calledOnce).toBe(true);
  });
});
