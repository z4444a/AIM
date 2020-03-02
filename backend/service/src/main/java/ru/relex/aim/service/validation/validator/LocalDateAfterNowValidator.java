package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.validation.annotation.AfterNow;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;

/**
 * Class for checking if specified date is after current date.
 *
 * @author Alexey Alimov
 */
public class LocalDateAfterNowValidator implements ConstraintValidator<AfterNow, LocalDate> {

  @Override
  public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    final var nowDate = LocalDate.now(context.getClockProvider().getClock());
    return !value.isBefore(nowDate);
  }
}
