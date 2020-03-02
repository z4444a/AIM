package ru.relex.aim.service.validation.annotation;


import ru.relex.aim.service.validation.validator.ParameterIdentifierSyntaxValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static ru.relex.aim.service.validation.code.ConstraintCode.UNAVAILABLE_VALUE;
import static ru.relex.aim.service.validation.code.ParameterCode.PARAMETER_IDENTIFIER;


/**
 * Validation annotation for checking if
 * specified string is correct regular expression.
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {ParameterIdentifierSyntaxValidator.class})
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface ParameterIdentifierSyntax {

  /**
   * Message to present if validation fails.
   */
  String message() default PARAMETER_IDENTIFIER + UNAVAILABLE_VALUE;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
