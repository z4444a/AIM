package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.model.base.AbstractParameterConstraintDto;
import ru.relex.aim.service.validation.annotation.NumberRange;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


/**
 * Validation annotation for checking
 * if max value > min value
 * in {@link AbstractParameterConstraintDto}.
 *
 * @author Dmitriy Poshevelya
 */
public class ConstraintNumberRangeValidator implements
    ConstraintValidator<NumberRange, AbstractParameterConstraintDto> {

  @Override
  public boolean isValid(AbstractParameterConstraintDto value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    final Integer minNumberValue = value.getMinNumberValue();
    final Integer maxNumberValue = value.getMaxNumberValue();
    if (minNumberValue == null || maxNumberValue == null) {
      return true;
    }

    return maxNumberValue > minNumberValue;
  }
}
