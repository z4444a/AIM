import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { InternalProps, UpdateTypePage } from './update-type-page';
import { getMockRouterProps } from '../../../../test-utils/route-component-props-mock';

describe('UpdateTypePage', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: InternalProps = {
      ...getMockRouterProps<{ id: string }>({ id: '1' }),
      fetchType: id => null,
      updateType: model => null,
    };

    wrapper = shallow(<UpdateTypePage {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
