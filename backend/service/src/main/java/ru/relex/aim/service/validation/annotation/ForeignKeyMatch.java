package ru.relex.aim.service.validation.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import ru.relex.aim.service.validation.validator.ConstraintForeignKeyMatchValidator;

import static ru.relex.aim.service.validation.code.ConstraintCode.FOREIGN_KEY_MATCH;

/**
 * Checks if child entity's foreign key matches parent's primary key.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {ConstraintForeignKeyMatchValidator.class})
@Target({ElementType.TYPE})
public @interface ForeignKeyMatch {

  /**
   * Message to present if validation fails.
   */
  String message() default FOREIGN_KEY_MATCH;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
