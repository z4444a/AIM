import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NamedModel from '../../../../model/base/named-model';
import { InternalProps, RequestStatus } from './request-status';
import { RequestStatus as ReqStatus } from '../../../../model/get/request-status';
import Timelapse from '@material-ui/icons/Timelapse';
import Brightness1 from '@material-ui/icons/Brightness1';
import Cancel from '@material-ui/icons/Cancel';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';

describe('RequestStatus', () => {
  function getComponentProps(status: NamedModel): InternalProps {
    const withTranslationProps = getMockWithTranslationProps();
    const props: InternalProps = {
      classes: {
        container: 'container',
        canceledReq: 'canceledReq',
        inProgressReq: 'inProgressReq',
        newReq: 'newReq',
        processedReq: 'processedReq',
      },
      status: status,
      ...withTranslationProps,
    };

    return props;
  }

  function getShallowWrapper(status: NamedModel) {
    const wrapper = shallow(<RequestStatus {...getComponentProps(status)} />);
    return wrapper;
  }

  it('should render correctly', () => {
    const wrapper = getShallowWrapper({ name: 'name', id: ReqStatus.NEW });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render NEW', () => {
    const wrapper = getShallowWrapper({ name: 'name', id: ReqStatus.NEW });
    expect(wrapper.find(Brightness1).exists()).toBe(true);
  });

  it('should render IN_PROGRESS', () => {
    const wrapper = getShallowWrapper({ name: 'name', id: ReqStatus.IN_PROGRESS });
    expect(wrapper.find(Timelapse).exists()).toBe(true);
  });

  it('should render CANCELED', () => {
    const wrapper = getShallowWrapper({ name: 'name', id: ReqStatus.CANCELED });
    expect(wrapper.find(Cancel).exists()).toBe(true);
  });

  it('should render PROCESSED', () => {
    const wrapper = getShallowWrapper({ name: 'name', id: ReqStatus.PROCESSED });
    expect(wrapper.find(Brightness1).exists()).toBe(true);
  });
});
