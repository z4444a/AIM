package ru.relex.aim.service.validation.validator;


import java.util.Objects;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import ru.relex.aim.service.model.update.ParameterUpdateDto;
import ru.relex.aim.service.validation.annotation.ForeignKeyMatch;

/**
 * Checks if constraint's primary key is the same as it's parameter primary key.
 *
 * @author Alexey Alimov
 */
public class ConstraintForeignKeyMatchValidator implements ConstraintValidator<ForeignKeyMatch, ParameterUpdateDto> {

  @Override
  public boolean isValid(ParameterUpdateDto value, ConstraintValidatorContext context) {
    if (value == null || value.getConstraint() == null || value.getConstraint().getId() == null) {
      return true;
    }
    return Objects.equals(value.getId(), value.getConstraint().getId());
  }
}
