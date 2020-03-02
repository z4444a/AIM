package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.service.IParameterService;

/**
 * Checks if a parameter create dto has unique identifier in his modifier-based group.
 */
public class OnCreateParameterIdentifierUniqueValidator
    extends AbstractParameterIdentifierUniqueValidator<ParameterCreateDto> {

  /**
   * Constructor.
   */
  public OnCreateParameterIdentifierUniqueValidator(IParameterService parameterService) {
    super(parameterService);
  }

  @Override
  protected Integer getId(ParameterCreateDto dto) {
    return null;
  }

}
