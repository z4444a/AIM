import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import { Props, ResourcePoolGridPage } from './resource-pool-grid-page';
import ResourcePoolParameters from '../../../../commons/parameters/resource-pool-parameters';
import { Order } from '../../Order';

describe('ResourcePoolGridPage', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const withTranslationProps = getMockWithTranslationProps();
    const params: ResourcePoolParameters = {
      order: Order.ASC,
      pageSize: 10,
      sortBy: 'name',
      page: 0,
      name: '',
    };
    const datasource = {
      content: [],
      totalElements: 10,
      page: 0,
    };
    const props: Props = {
      params,
      redirect: () => null,
      fetchTypeSuggestions: () => {},
      fetch: () => null,
      datasource,
      createPool: null,
      updatePool: null,
      ...withTranslationProps,
    };
    wrapper = shallow(<ResourcePoolGridPage {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
