package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.model.base.AbstractParameterDto;
import ru.relex.aim.service.service.IParameterService;
import ru.relex.aim.service.validation.annotation.ParameterIdentifierUnique;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Checks if a parameter has unique identifier in his modifier-based group.
 */
public abstract class AbstractParameterIdentifierUniqueValidator<T extends AbstractParameterDto>
    implements ConstraintValidator<ParameterIdentifierUnique, T> {

  private final IParameterService parameterService;

  /**
   * Constructor.
   */
  public AbstractParameterIdentifierUniqueValidator(IParameterService parameterService) {
    this.parameterService = parameterService;
  }

  /**
   * Return ID of the object if it's presented. Returns {@code null} otherwise.
   */
  protected abstract Integer getId(T dto);

  @Override
  public boolean isValid(T dto, ConstraintValidatorContext context) {
    if (dto == null) {
      return true;
    }
    return !parameterService.isIdentifierUsed(dto.getIdentifier(), dto.getModifier(), getId(dto));
  }

}
