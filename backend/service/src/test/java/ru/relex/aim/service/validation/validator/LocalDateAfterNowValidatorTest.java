package ru.relex.aim.service.validation.validator;

import java.time.LocalDate;
import javax.validation.ConstraintValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import ru.relex.aim.service.validation.annotation.AfterNow;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class LocalDateAfterNowValidatorTest extends BaseValidatorTest<AfterNow, LocalDate> {

  @Override
  protected ConstraintValidator<AfterNow, LocalDate> createValidator() {
    return new LocalDateAfterNowValidator();
  }

  @Override
  protected Class<AfterNow> annotation() {
    return AfterNow.class;
  }

  @Test
  @DisplayName("Check that validator accepts nulls correctly")
  void testLocalDateAfterNowValidator_onNull() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that validator accepts valid date")
  void testLocalDateAfterNowValidator_onValidDate() {
    Assertions.assertTrue(validateOn(LocalDate.now().plusDays(1)));
  }

  @Test
  @DisplayName("Check that validator accepts invalid date")
  void testLocalDateAfterNowValidator_onInvalidDate() {
    Assertions.assertFalse(validateOn(LocalDate.now().minusDays(1)));
  }
}
