package ru.relex.aim.service.validation.validator;

import java.time.LocalDate;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import ru.relex.aim.service.model.base.AbstractRequestDto;
import ru.relex.aim.service.validation.annotation.DateFrame;

/**
 * Validation class for checking if
 * finish usage date is after start usage date
 * in {@link AbstractRequestDto}.
 *
 * @author Alexey Alimov
 */
public class RequestUsageDateFrameValidator implements ConstraintValidator<DateFrame, AbstractRequestDto> {

  @Override
  public boolean isValid(AbstractRequestDto value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    final LocalDate start = value.getUsageStart();
    final LocalDate finish = value.getUsageFinish();

    if (start == null || finish == null) {
      return true;
    }

    return finish.isAfter(start);
  }
}
