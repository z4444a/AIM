import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CreateTypePage, InternalProps } from './create-type-page';

describe('CreateTypePage', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props: InternalProps = {
      createType: () => {},
    };

    wrapper = shallow(<CreateTypePage {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
