import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import { EmployeesPage, Props } from './employees-page';
import { Order } from '../../../resource-pool/Order';
import { EmployeeParams } from '../../../../model/parameters/employee-params';

describe('EmployeesPage', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const withTranslationProps = getMockWithTranslationProps();
    const params: EmployeeParams = {
      order: Order.ASC,
      pageSize: 10,
      sortBy: 'firstName',
      page: 0,
      name: '',
    };
    const page = {
      content: [],
      totalElements: 10,
      page: 0,
    };
    const props: Props = {
      params,
      redirect: () => null,
      fetch: () => null,
      sync: () => null,
      toggleFilterPanel: () => null,
      page,
      ...withTranslationProps,
      showFilterPanel: true,
    };
    wrapper = shallow(<EmployeesPage {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
