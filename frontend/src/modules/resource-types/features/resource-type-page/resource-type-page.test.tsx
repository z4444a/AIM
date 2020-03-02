import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { InternalProps, ResourceTypePage } from './resource-type-page';
import { getMockRouterProps } from '../../../../test-utils/route-component-props-mock';
import { TypeFormModel } from '../../../../model/form/type-form-model';
import { ParameterFormModel } from '../../../../model/form/parameter-form-model';
import { ParameterType } from '../../../../model/parameter-type';
import { ParameterModifier } from '../../../../model/parameter-modifier';

describe('ResourceTypePage', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const formModel: TypeFormModel = {
      active: false,
      description: '',
      id: 0,
      name: '',
      needsBackup: false,
      quantitative: false,
      parameters: [],
      picture: {
        picture: [],
        picturePath: '',
      },
    };

    const parameterFormModel: ParameterFormModel = {
      constraint: {},
      identifier: '',
      name: '',
      parameterType: ParameterType.NUMBER,
      required: false,
      modifier: ParameterModifier.REQUEST_PARAMETER,
      order: 0,
    };

    const props: InternalProps = {
      ...getMockRouterProps(null),
      classes: {
        container: 'container',
      },
      dialogIsOpen: false,
      editedParameterName: null,
      formModel: formModel,
      highlightEmpty: false,
      parameterFormModel: parameterFormModel,
      hideDialog: () => null,
      onSubmit: (p1: TypeFormModel) => null,
      redirect: () => null,
      resetEditedParameterName: () => null,
      resetFormModel: () => null,
      resetHighlightEmpty: () => null,
      resetParameterFormModel: () => null,
      setEditedParameterName: () => null,
      setHighlightEmpty: () => null,
      showDialog: () => null,
      updateFormModel: () => null,
      updateParameterFormModel: () => null,
    };
    wrapper = shallow(<ResourceTypePage {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
