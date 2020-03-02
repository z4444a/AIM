package ru.relex.aim.service.validation.annotation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import ru.relex.aim.service.model.create.ResourceTypeCreateDto;
import ru.relex.aim.service.validation.validator.ParameterNameValidator;

import static ru.relex.aim.service.validation.code.ConstraintCode.DUPLICATE;

/**
 * Annotation used to check that
 * {@link ResourceTypeCreateDto}
 * doesn't have duplicate parameters by name.
 *
 * @author Dmitriy Poshevelya
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {ParameterNameValidator.class})
@Target({ElementType.TYPE})
public @interface UniqueNames {
  /**
   * Message to present if validation fails.
   */
  String message() default DUPLICATE;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
