package ru.relex.aim.service.validation.annotation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.validation.validator.TypeMatchesConstraintValidator;

import static ru.relex.aim.service.validation.code.ConstraintCode.MISMATCH;

/**
 * Validation annotation used to check if
 * specified constraint matches the parameter type in
 * {@link ParameterCreateDto}.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {TypeMatchesConstraintValidator.class})
@Target({ElementType.TYPE})
public @interface ConstraintMatchesType {
  /**
   * Message to present if validation fails.
   */
  String message() default MISMATCH;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}

