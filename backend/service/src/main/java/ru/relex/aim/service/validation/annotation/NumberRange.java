package ru.relex.aim.service.validation.annotation;


import ru.relex.aim.service.validation.validator.ConstraintNumberRangeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static ru.relex.aim.service.validation.code.ConstraintCode.NUMBER_RANGE;

/**
 * Validation annotation
 * used to check if minimum number is less
 * than maximum number in a number range.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {ConstraintNumberRangeValidator.class})
@Target({ElementType.TYPE})
public @interface NumberRange {

  /**
   * Message to present if validation fails.
   */
  String message() default NUMBER_RANGE;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
