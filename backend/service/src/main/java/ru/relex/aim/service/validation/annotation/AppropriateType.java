package ru.relex.aim.service.validation.annotation;

import ru.relex.aim.service.validation.validator.AppropriateTypeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static ru.relex.aim.service.validation.code.ConstraintCode.INAPPROPRIATE_TYPE;

/**
 * Validation annotation for checking if
 * selected resource type equals to parameters types.
 *
 * @author Nastya Zinchenko
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {AppropriateTypeValidator.class})
@Target({ElementType.TYPE})
public @interface AppropriateType {

  /**
   * Message to present if validation fails.
   */
  String message() default INAPPROPRIATE_TYPE;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
