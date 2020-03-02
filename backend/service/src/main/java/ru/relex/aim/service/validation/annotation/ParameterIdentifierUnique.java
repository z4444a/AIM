package ru.relex.aim.service.validation.annotation;


import ru.relex.aim.service.validation.validator.OnCreateParameterIdentifierUniqueValidator;
import ru.relex.aim.service.validation.validator.OnUpdateParameterIdentifierUniqueValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static ru.relex.aim.service.validation.code.ParameterCode.PARAMETER_IDENTIFIER;


/**
 * Validation annotation for checking if
 * specified string is correct regular expression.
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {
    OnCreateParameterIdentifierUniqueValidator.class,
    OnUpdateParameterIdentifierUniqueValidator.class
    })
@Target({ElementType.TYPE})
public @interface ParameterIdentifierUnique {

  /**
   * Message to present if validation fails.
   */
  String message() default PARAMETER_IDENTIFIER;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
