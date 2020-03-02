package ru.relex.aim.service.validation.validator;

import ru.relex.aim.repository.repository.ResourceTypeRepository;
import ru.relex.aim.service.model.base.AbstractParameterDto;
import ru.relex.aim.service.model.base.ParameterTypeDto;


import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.NotNull;

import ru.relex.aim.service.validation.annotation.ConstraintMatchesType;

/**
 * Checks if provided constraint in {@link AbstractParameterDto}
 * matches it's type.
 *
 * @author Dmitriy Poshevelya
 * @author Alexey Alimov
 */
public class TypeMatchesConstraintValidator implements
    ConstraintValidator<ConstraintMatchesType, AbstractParameterDto> {

  private final ResourceTypeRepository resourceTypeRepository;

  /**
   * Constructor.
   */
  public TypeMatchesConstraintValidator(ResourceTypeRepository resourceTypeRepository) {
    this.resourceTypeRepository = resourceTypeRepository;
  }

  @Override
  public boolean isValid(AbstractParameterDto value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    final ParameterTypeDto parameterTypeDto = value.getParameterType();
    if (parameterTypeDto == null) {
      return true;
    }
    return validateByType(parameterTypeDto, value);
  }

  private boolean validateByType(@NotNull ParameterTypeDto parameterTypeDto, AbstractParameterDto value) {
    switch (parameterTypeDto) {
      case LIST:
        return checkListValues(value);
      case NUMBER:
      case DATE:
      case TEXT:
      case REAL:
        return true;
      case POOL:
        return hasPoolReference(value);
      default:
        throw new UnsupportedOperationException("Checking for " + parameterTypeDto.getName()
            + " is not supported");
    }
  }

  private boolean checkListValues(AbstractParameterDto value) {
    final var paramConstCreateDto = value.getConstraint();
    if (paramConstCreateDto == null) {
      return true;
    }
    final var listValues = paramConstCreateDto.getListValues();
    return listValues != null && !listValues.isEmpty();
  }

  private boolean hasPoolReference(AbstractParameterDto value) {
    final Integer typeId = value.getPoolTypeId();
    return typeId != null && resourceTypeRepository.existsById(typeId);
  }
}
