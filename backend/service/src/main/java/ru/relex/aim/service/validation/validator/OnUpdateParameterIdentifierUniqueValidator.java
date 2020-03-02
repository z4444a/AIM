package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.model.update.ParameterUpdateDto;
import ru.relex.aim.service.service.IParameterService;

/**
 * Checks if a parameter update dto has unique identifier in his modifier-based group.
 */
public class OnUpdateParameterIdentifierUniqueValidator
    extends AbstractParameterIdentifierUniqueValidator<ParameterUpdateDto> {

  /**
   * Constructor.
   */
  public OnUpdateParameterIdentifierUniqueValidator(IParameterService parameterService) {
    super(parameterService);
  }

  @Override
  protected Integer getId(ParameterUpdateDto dto) {
    return dto.getId();
  }

}
