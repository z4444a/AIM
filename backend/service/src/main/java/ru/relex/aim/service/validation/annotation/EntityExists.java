package ru.relex.aim.service.validation.annotation;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.validation.validator.EntityExistsValidator;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Validation annotation for checking
 * if entity with given id is present in database.
 * You must specify validated {@link EntityType}.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {EntityExistsValidator.class})
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface EntityExists {

  /**
   * Validated entity type.
   */
  EntityType entityType();

  /**
   * Message to present if validation fails.
   */
  String message() default ENTITY_EXISTS;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}


