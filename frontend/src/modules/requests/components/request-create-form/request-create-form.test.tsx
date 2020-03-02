import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import { CreateRequestFormModel, InternalProps, RequestCreateForm } from './request-create-form';

describe('RequestCreateForm', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const classes = {
      container: 'container',
      btnContainer: 'btnContainer',
      formLine: 'formLine',
      dateRangeContainer: 'dateRangeContainer',
      resourceTypeLine: 'resourceTypeLine',
    };
    const withTranslationProps = getMockWithTranslationProps();
    const formModel: CreateRequestFormModel = {
      name: 'name',
      resourceTypeId: '1',
      startDate: null,
      endDate: null,
      resourceTypeParams: {},
    };
    const props: InternalProps = {
      classes,
      formModel,
      ...withTranslationProps,
    };
    wrapper = shallow(<RequestCreateForm {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
