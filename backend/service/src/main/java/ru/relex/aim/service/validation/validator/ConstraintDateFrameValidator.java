package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.model.base.AbstractParameterConstraintDto;
import ru.relex.aim.service.validation.annotation.DateFrame;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;

/**
 * Validation annotation for checking
 * in {@link AbstractParameterConstraintDto}.
 *
 * @author Dmitriy Poshevelya
 * @author Alexey Alimov
 */
public class ConstraintDateFrameValidator implements
    ConstraintValidator<DateFrame, AbstractParameterConstraintDto> {
  @Override
  public boolean isValid(AbstractParameterConstraintDto value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    final LocalDate minDateValue = value.getMinDateValue();
    final LocalDate maxDateValue = value.getMaxDateValue();
    if (maxDateValue == null || minDateValue == null) {
      return true;
    }
    return maxDateValue.isAfter(minDateValue);
  }
}
