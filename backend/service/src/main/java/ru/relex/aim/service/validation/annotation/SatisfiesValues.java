package ru.relex.aim.service.validation.annotation;


import ru.relex.aim.service.validation.validator.SatisfiesValuesValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static ru.relex.aim.service.validation.code.ConstraintCode.INVALID_VALUES;

/**
 * Validation annotation for checking if
 * parameter value satisfies all specified constraints.
 *
 * @author Nastya Zinchenko
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {SatisfiesValuesValidator.class/*, UpdateSatisfiesValuesValidator.class*/})
@Target({ElementType.TYPE})
public @interface SatisfiesValues {

  /**
   * Message to present if validation fails.
   */
  String message() default INVALID_VALUES;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}

