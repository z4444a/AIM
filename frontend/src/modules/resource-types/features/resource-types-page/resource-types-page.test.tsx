import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import { Order } from '../../../resource-pool/Order';
import { Props, ResourceTypesPage } from './resource-types-page';
import { ResourceTypesParams } from '../../../../model/parameters/resource-types-parameters';

describe('ResourceTypesPage', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const withTranslationProps = getMockWithTranslationProps();
    const params: ResourceTypesParams = {
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
      fetch: () => null,
      datasource,
      ...withTranslationProps,
    };
    wrapper = shallow(<ResourceTypesPage {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
