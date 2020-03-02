package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.validation.annotation.BeforeNow;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.Instant;

/**
 * Class for checking if specified date is after current date.
 */
public class InstantAfterNowValidator implements ConstraintValidator<BeforeNow, Instant> {

  @Override
  public boolean isValid(Instant value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    final var nowDate = Instant.now();
    return value.isBefore(nowDate);
  }
}
