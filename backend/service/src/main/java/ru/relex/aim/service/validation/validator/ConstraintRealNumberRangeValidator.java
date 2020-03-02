package ru.relex.aim.service.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import ru.relex.aim.service.model.base.AbstractParameterConstraintDto;
import ru.relex.aim.service.validation.annotation.RealNumberRange;

/**
 * Checks that max real value > min real value
 * in {@link AbstractParameterConstraintDto}.
 *
 * @author Alexey Alimov
 */
public class ConstraintRealNumberRangeValidator
    implements ConstraintValidator<RealNumberRange, AbstractParameterConstraintDto> {

  @Override
  public boolean isValid(AbstractParameterConstraintDto value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    final Float minValue = value.getMinRealValue();
    final Float maxValue = value.getMaxRealValue();
    if (minValue == null || maxValue == null) {
      return true;
    }

    return maxValue.compareTo(minValue) > 0;
  }
}
