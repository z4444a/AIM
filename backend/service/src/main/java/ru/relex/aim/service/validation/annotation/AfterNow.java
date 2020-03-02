package ru.relex.aim.service.validation.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import ru.relex.aim.service.validation.validator.LocalDateAfterNowValidator;

/**
 * Validation annotation for checking if
 * specified date is after current date.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {LocalDateAfterNowValidator.class})
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface AfterNow {

  /**
   * Message to present if validation fails.
   */
  String message() default AFTER_NOW;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
