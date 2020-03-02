import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { AimAutocomplete, InternalProps, SuggestionItem } from './aim-autocomplete';

describe('AimAutocomplete', () => {
  function getComponentProps(): InternalProps {
    const props: InternalProps = {
      classes: {
        container: 'container',
        paper: 'paper',
      },
      getSuggestions: (value: string) => {
        const suggestions: SuggestionItem[] = [
          {
            key: '1',
            value: 'value1',
          },
          {
            key: '2',
            value: 'value2',
          },
        ];
        return suggestions;
      },
    };
    return props;
  }

  function generateShallowWrapper() {
    return shallow(<AimAutocomplete {...getComponentProps()} />);
  }

  it('should render correctly', () => {
    const wrapper = generateShallowWrapper();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
