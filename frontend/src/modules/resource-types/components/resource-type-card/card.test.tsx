import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { InternalProps, ResourceTypesCard } from './card';
import { TypeFormModel } from '../../../../model/form/type-form-model';
import { ParameterFormModel } from '../../../../model/form/parameter-form-model';
import { ParameterType } from '../../../../model/parameter-type';
import { getMockWithTranslationProps } from '../../../../test-utils/with-translation-props-mock';
import { ParameterModifier } from '../../../../model/parameter-modifier';

describe('ResourceTypesCard', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const type: TypeFormModel = {
      active: true,
      description: '',
      id: 0,
      name: '',
      needsBackup: false,
      parameters: [],
      picture: {
        picture: [],
        picturePath: '',
      },
      quantitative: false,
    };

    const parameterFormModel: ParameterFormModel = {
      constraint: {},
      identifier: '',
      name: '',
      parameterType: ParameterType.NUMBER,
      required: false,
      modifier: ParameterModifier.REQUEST_PARAMETER,
    };

    const props: InternalProps = {
      ...getMockWithTranslationProps(),
      classes: {
        buttonGroup: 'buttonGroup',
        completeButton: 'completeButton',
        container: 'container',
      },
      dialogIsOpen: false,
      editedParameterName: null,
      highlightEmpty: false,
      onCancelButtonClick: () => null,
      onChange: (p1: TypeFormModel) => null,
      onCompleteButtonClick: () => null,
      onDialogClosed: () => null,
      onDialogOpened: () => null,
      onHighlightEmptyReset: () => null,
      onHighlightEmptySet: () => null,
      onParameterEditReset: () => null,
      onParameterEditSet: () => null,
      onParameterFormChange: () => null,
      parameterRows: parameterFormModel,
      type: type,
    };
    wrapper = shallow(<ResourceTypesCard {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
