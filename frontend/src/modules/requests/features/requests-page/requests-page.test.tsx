import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import { Order } from '../../../resource-pool/Order';
import { Props, RequestsPage } from './requests-page';
import { RequestParams } from '../../../../model/parameters/request-params';

describe('RequestsPage', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const withTranslationProps = getMockWithTranslationProps();
    const params: RequestParams = {
      order: Order.ASC,
      pageSize: 10,
      sortBy: 'type',
      page: 0,
      typeName: '',
    };
    const requests = {
      content: [],
      totalElements: 10,
      page: 0,
    };
    const props: Props = {
      params,
      fetchRequests: () => {},
      fetchTypeSuggestions: () => {},
      clearTypeSuggestions: () => {},
      redirect: () => {},
      requests,
      typeSuggestions: [],
      ...withTranslationProps,
    };
    wrapper = shallow(<RequestsPage {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
