package ru.relex.aim.service.validation.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import ru.relex.aim.service.validation.validator.ConstraintDateFrameValidator;
import ru.relex.aim.service.validation.validator.RequestUsageDateFrameValidator;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;

/**
 * Validation annotation used
 * to check if maximum date is after
 * minimum date in a date frame.
 *
 * @author Alexey Alimov
 */
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {
    ConstraintDateFrameValidator.class,
    RequestUsageDateFrameValidator.class
})
@Target({ElementType.TYPE})
public @interface DateFrame {

  /**
   * Message to present if validation fails.
   */
  String message() default DATE_FRAME;

  /**
   * Action groups before which validation needs to be performed.
   */
  Class<?>[] groups() default {};

  /**
   * Meta information used in validation.
   */
  Class<? extends Payload>[] payload() default {};
}
