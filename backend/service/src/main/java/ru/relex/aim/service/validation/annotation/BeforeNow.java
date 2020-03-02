package ru.relex.aim.service.validation.annotation;

import ru.relex.aim.service.validation.validator.InstantAfterNowValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * Validation annotation for checking if
 * specified date is after current date.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {InstantAfterNowValidator.class})
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface BeforeNow {

  /**
   * Message to present if validation fails.
   */
  String message() default "The given time of the last update is not correct";

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
