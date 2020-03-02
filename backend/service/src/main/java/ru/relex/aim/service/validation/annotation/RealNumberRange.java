package ru.relex.aim.service.validation.annotation;

import static ru.relex.aim.service.validation.code.ConstraintCode.NUMBER_RANGE;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import ru.relex.aim.service.validation.validator.ConstraintRealNumberRangeValidator;

/**
 * Validation annotation
 * used to check if minimum reak number is less
 * than maximum real number in a number range.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {ConstraintRealNumberRangeValidator.class})
@Target({ElementType.TYPE})
public @interface RealNumberRange {


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
