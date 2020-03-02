package ru.relex.aim.service.validation.validator;

import org.mockito.Mockito;

import javax.validation.ConstraintValidatorContext;
import java.time.Clock;

/**
 * Factory to provide different constraint validator contexts
 */
public final class ConstraintValidatorContextFactory {

  private ConstraintValidatorContextFactory() {
  }

  /**
   * Builds context mock with {@link javax.validation.ClockProvider} that returns {@link Clock#systemUTC()}.
   *
   * @return {@link ConstraintValidatorContext} instance mock
   */
  public static ConstraintValidatorContext buildDefaultContext() {
    ConstraintValidatorContext context = Mockito.mock(ConstraintValidatorContext.class, Mockito.withSettings().stubOnly());
    Mockito.when(context.getClockProvider()).thenReturn(Clock::systemUTC);
    Mockito.when(context.getDefaultConstraintMessageTemplate()).thenReturn("");
    Mockito
        .when(context.buildConstraintViolationWithTemplate(Mockito.anyString()))
        .thenReturn(Mockito.mock(ConstraintValidatorContext.ConstraintViolationBuilder.class));
    return context;
  }
}
